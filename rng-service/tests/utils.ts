// @ts-nocheck

//import {Keypair} from "@solana/wallet-adapter-react";
import {Connection, PublicKey, Keypair} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import * as fs from 'fs';
export const HOUSE_PROGRAM_ID = new PublicKey("DyLnp87en5buc6epv1s9RrhveqZoNa1n9vN5YpDmGhQh");
export const PREFIX = 'rng_house';
export const FEES = "fees";
export const TREASURY = 'treasury';
export const jare = "4tui4yfA6MNgLhjXmKBATrPvEUGseEeqQrqAyVHintUQ";
export const author = new PublicKey(jare);
//export const house = new PublicKey("ASTu9TrWQkQL693SzAZ2533f871WUP3RxkW9y6nLGP9L");
export const DEFAULT_TIMEOUT = 30000;

export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
);

export function loadWalletKey(keypair: string): Keypair {
  if (!keypair || keypair === '') {
    throw new Error('Keypair is required!');
  }
  return Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync(keypair).toString())));
}

export async function loadHouseProgram(walletWrapper: Keypair) {
  const solConnection = new Connection("https://api.devnet.solana.com");
  const walletWrapper2 = new anchor.Wallet(walletWrapper);
  const provider = new anchor.Provider(solConnection, walletWrapper2, {
    preflightCommitment: "confirmed", commitment: "confirmed"
  });
  const idl = await anchor.Program.fetchIdl(
      HOUSE_PROGRAM_ID,
      provider,
  );

  // const idl = await anchor.Program.fetchIdl(HOUSE_PROGRAM_ID, provider);

  return new anchor.Program(idl, HOUSE_PROGRAM_ID, provider);
}

export async function getHouse(author: PublicKey, operator: PublicKey) {
  // #[account(init, seeds=[PREFIX.as_bytes(), author.key().as_ref(), operator.key().as_ref()], bump=house_bump, space=HOUSE_SIZE, payer=author)]
  // house: Account<'info, House>,
  return await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(PREFIX),
        author.toBuffer(),
        operator.toBuffer()],
      HOUSE_PROGRAM_ID,
  );
}


export async function getAuthorFeeAccount(house: PublicKey, author: PublicKey, operator: PublicKey) {
  // #[account(mut, seeds=[PREFIX.as_bytes(), FEES.as_bytes(), house.key().as_ref(), author.key.as_ref(), operator.key.as_ref()], bump=author_fee_bump)]
  // author_fee_account: UncheckedAccount<'info>,
  return await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(PREFIX),
        Buffer.from(FEES),
        house.toBuffer(),
        author.toBuffer(),
        operator.toBuffer(),
      ],
      HOUSE_PROGRAM_ID,
  );
}


export async function getOperatorTreasuryAccount(house: PublicKey, author: PublicKey, operator: PublicKey) {
  // #[account(mut, seeds=[PREFIX.as_bytes(), TREASURY.as_bytes(), house.key().as_ref(), author.key.as_ref(), operator.key.as_ref()], bump=operator_treasury_bump)]
  // operator_treasury: UncheckedAccount<'info>,
  return await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(PREFIX),
        Buffer.from(TREASURY),
        house.toBuffer(),
        author.toBuffer(),
        operator.toBuffer(),
      ],
      HOUSE_PROGRAM_ID,
  );
}

export async function getOperatorFeeAccount(house: PublicKey, author: PublicKey, operator: PublicKey) {
  // #[account(mut, seeds=[PREFIX.as_bytes(), FEES.as_bytes(), house.key().as_ref(), author.key.as_ref(), operator.key.as_ref()], bump=operator_fee_bump)]
  // operator_fee_account: UncheckedAccount<'info>,
  return await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from(PREFIX),
        Buffer.from(FEES),
        house.toBuffer(),
        author.toBuffer(),
        operator.toBuffer(),
      ],
      HOUSE_PROGRAM_ID,
  );
}

export async function getPlayerAccount(walletKeyPair: Keypair, house: PublicKey, uuid: string) {
  return await anchor.web3.PublicKey.findProgramAddress(
      // @ts-ignore
      [Buffer.from("rng_house"),
        walletKeyPair.publicKey.toBuffer(),
        house.toBuffer(),
        Buffer.from(uuid)],
      HOUSE_PROGRAM_ID
  );
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getUnixTs = () => {
  return new Date().getTime() / 1000;
};
