import {
  getAuthorFeeAccount,
  getHouse,
  getOperatorFeeAccount,
  getOperatorTreasuryAccount,
  loadHouseProgram,
  loadWalletKey
} from "./helpers/utils";
import {SYSVAR_RENT_PUBKEY, SystemProgram, Connection} from "@solana/web3.js";
import {ASSOCIATED_TOKEN_PROGRAM_ID} from "@solana/spl-token";
import * as anchor from '@project-serum/anchor';
import {WRAPPED_SOL_MINT, TOKEN_PROGRAM_ID, LOGS_DIR} from "./helpers/constants";
const MINT_ACCOUNT = WRAPPED_SOL_MINT
import {mkdir, printAndLog} from "./helpers/logger";
new Connection("https://api.devnet.solana.com");
const walletJson = "./throwaway.json"
const walletKeyPair = loadWalletKey(walletJson);
mkdir(LOGS_DIR);

async function main() {
  const logName = `${LOGS_DIR}/create-house.log`;
  const puppetMaster = await loadHouseProgram(walletKeyPair);
  if (!puppetMaster) {
    printAndLog(logName, `puppetMaster is null`);
    return;
  }
  const author = new anchor.web3.PublicKey("4tui4yfA6MNgLhjXmKBATrPvEUGseEeqQrqAyVHintUQ")

  const operatorWalletJson = "./operator.json"

  const operatorWalletKeyPair = loadWalletKey(operatorWalletJson);
  const operator = operatorWalletKeyPair.publicKey
  const [house, houseBump] = await getHouse(author, operator);
  
  const [authorFeeAccount, authorFeeAccountBump] = await getAuthorFeeAccount(house, author, operator);
  const [operatorTreasuryAccount, operatorTreasuryAccountBump] = await getOperatorTreasuryAccount(house, author, operator);
  const [operatorFeeAccount, operatorFeeAccountBump] = await getOperatorFeeAccount(house, author, operator);
  const feeBasisPoints = 350;
  printAndLog(logName, `Wallet PubKey : ${walletKeyPair.publicKey.toBase58()}`);
  let accounts = {
    author: walletKeyPair.publicKey,
    operator: operator,
    mint: MINT_ACCOUNT,
    house: house,
    authorFeeAccount: authorFeeAccount,
    authorFeeAccountDestination: author,
    operatorTreasury: operatorTreasuryAccount,
    operatorTreasuryDestination: operator,
    operatorFeeAccount: operatorFeeAccount,
    operatorFeeDestination: operator
  }
  for (const [k, v] of Object.entries(accounts)) {
    try{
      printAndLog(logName, `${k} => ${v.toBase58()}`);
    } catch (err: any) {
    }
  }
  const houseWithSol = await puppetMaster.rpc.createHouse(
      houseBump,
      authorFeeAccountBump,
      operatorTreasuryAccountBump,
      operatorFeeAccountBump,
      feeBasisPoints,
      {
        accounts: {
          author: walletKeyPair.publicKey,
          operator: operator,
          mint: MINT_ACCOUNT,
          house: house,
          authorFeeAccount: authorFeeAccount,
          authorFeeAccountDestination: author,
          operatorTreasury: operatorTreasuryAccount,
          operatorTreasuryDestination: operator,
          operatorFeeAccount: operatorFeeAccount,
          operatorFeeDestination: operator,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
          ataProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        },
        signers: [walletKeyPair],
      });
  printAndLog(logName, `House : ${houseWithSol}`);
  printAndLog(logName, `House PubKey: ${house.toBase58()}`);
  printAndLog(logName, `Please supply your treasury with sol: ${operatorTreasuryAccount.toBase58()}`);
}

main().then(() => console.log("Success"));
