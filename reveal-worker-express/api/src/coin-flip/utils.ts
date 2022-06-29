import {Connection, Keypair, PublicKey} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import {FEES, HOUSE_PROGRAM_ID, PREFIX, TREASURY} from "./constants";
import {walletKey} from "./wallet";
import {Program} from "@project-serum/anchor";

export function loadWalletKey(): Keypair {
  const keypair = Keypair.fromSecretKey(new Uint8Array(walletKey));
  console.log(`wallet public key: ${keypair.publicKey}`);
  return keypair;
}

export async function loadHouseProgram(keypair: Keypair): Promise<Program> {
  const solConnection = new Connection("https://ssc-dao.genesysgo.net/");
  const walletWrapper = new anchor.Wallet(keypair);
  const provider = new anchor.AnchorProvider(solConnection, walletWrapper, {
    preflightCommitment: 'confirmed', commitment: 'confirmed'
  });
  const idl = await anchor.Program.fetchIdl(
      HOUSE_PROGRAM_ID,
      provider,
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new anchor.Program(idl, HOUSE_PROGRAM_ID, provider);
}

export async function getHouse(author: PublicKey, operator: PublicKey): Promise<[PublicKey, number]> {
  // #[account(init, seeds=[PREFIX.as_bytes(), author.key().as_ref(), operator.key().as_ref()], bump=house_bump, space=HOUSE_SIZE, payer=author)]
  // house: Account<'info, House>,
  return await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(PREFIX),
        author.toBuffer(),
        operator.toBuffer()],
      HOUSE_PROGRAM_ID,
  );
}


export async function getAuthorFeeAccount(house: PublicKey, author: PublicKey, operator: PublicKey): Promise<[PublicKey, number]>  {
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


export async function getOperatorTreasuryAccount(house: PublicKey, author: PublicKey, operator: PublicKey): Promise<[PublicKey, number]>  {
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

export async function getOperatorFeeAccount(house: PublicKey, author: PublicKey, operator: PublicKey): Promise<[PublicKey, number]>  {
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

export async function getPlayerAccount(player: PublicKey, house: PublicKey, uuid: string): Promise<[PublicKey, number]>  {
  return await anchor.web3.PublicKey.findProgramAddress(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [Buffer.from("rng_house"),
        player.toBuffer(),
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
