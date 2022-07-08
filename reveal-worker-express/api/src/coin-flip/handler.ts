import {Connection, PublicKey} from "@solana/web3.js";
import {sendTransactionWithRetryWithKeypair, TxnData} from "./transactions";
import {loadWalletKey} from "./utils";
import {author, DEVNET, MAINNET} from "./constants";
import {revealCoin} from "./reveal";
const keypair = loadWalletKey();


interface Results {
  txndata: TxnData | null;
  status: string;
  player: string;
  uuid: string;
  error: string | null;
}

enum ENV {
  devnet = "mainnet-beta",
  mainnet = "mainnet-beta"
}

export async function handleRequest(player: string, uuid: string, env: ENV): Promise<Results> {
  let solConnection;
  if (env === ENV.devnet) {
     solConnection = new Connection(DEVNET);
  } else {
    solConnection = new Connection(MAINNET);
  }

  const playerKey = new PublicKey(player);
  const instruction = await revealCoin(keypair, playerKey, author, uuid);
  let results: Results;

  try {
    const txn = await sendTransactionWithRetryWithKeypair(solConnection, keypair, [instruction], [], 'max');
    results = {
      txndata: txn,
      status: "won",
      player: playerKey.toBase58(),
      uuid: uuid,
      error: null
    }
  } catch (e) {
    results = {
      txndata: null,
      status: "lost",
      player: playerKey.toBase58(),
      uuid: uuid,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      error: e.message
    }
  }
  return results;
}
