import {
  Blockhash,
  Commitment,
  Connection,
  FeeCalculator,
  Keypair,
  RpcResponseAndContext,
  SignatureStatus,
  SimulatedTransactionResponse,
  Transaction,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';
import { DEFAULT_TIMEOUT } from './constants';
import log from 'loglevel';
import {AnchorWallet} from "@solana/wallet-adapter-react";

interface BlockhashAndFeeCalculator {
  blockhash: Blockhash;
  feeCalculator: FeeCalculator;
}

export const sendTransactionWithRetryWithKeypair = async (
    connection: Connection,
    wallet: AnchorWallet,
    instructions: TransactionInstruction[],
    signers: Keypair[],
    commitment: Commitment = "recent",
    includesFeePayer: boolean = false,
    block?: BlockhashAndFeeCalculator,
    beforeSend?: () => void,
) => {
  const transaction = new Transaction();
  instructions.forEach(instruction => transaction.add(instruction));
  transaction.recentBlockhash = (
      block || (await connection.getRecentBlockhash(commitment))
  ).blockhash;

  // if (signers.length > 0) {
  //   transaction.sign(...[wallet, ...signers]);
  // } else {
  //   transaction.sign(wallet);
  // }
  //
  // if (beforeSend) {
  //   beforeSend();
  // }
  
  transaction.feePayer = wallet.publicKey
  await wallet?.signTransaction(transaction);
  const { txid, slot } = await sendSignedTransaction({
    connection,
    signedTransaction: transaction,
  });

  return { txid, slot };
};

export async function sendSignedTransaction({
                                              signedTransaction,
                                              connection,
                                              timeout = DEFAULT_TIMEOUT,
                                            }: {
  signedTransaction: Transaction;
  connection: Connection;
  sendingMessage?: string;
  sentMessage?: string;
  successMessage?: string;
  timeout?: number;
}): Promise<{ txid: string; slot: number }> {
  const rawTransaction = signedTransaction.serialize();
  const startTime = new Date().getTime()//getUnixTs();
  let slot = 0;
  const txid: TransactionSignature = await connection.sendRawTransaction(
      rawTransaction,
      {
        skipPreflight: true,
      },
  );

  log.debug('Started awaiting confirmation for', txid);

  let done = false;
     await  connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
      });
  try {
    const confirmation = await awaitTransactionSignatureConfirmation(
        txid,
        timeout,
        connection,
        "recent",
        true,
    );

    if (!confirmation)
      throw new Error('Timed out awaiting confirmation on transaction');

    if (confirmation.err) {
      log.error(confirmation.err);
      throw new Error('Transaction failed: Custom instruction error');
    }

    slot = confirmation?.slot || 0;
  } catch (err) {
    log.error('Timeout Error caught', err);
    // @ts-ignore
    if (err.timeout) {
      throw new Error('Timed out awaiting confirmation on transaction');
    }
    let simulateResult: SimulatedTransactionResponse | null = null;
    try {
      simulateResult = (
          await simulateTransaction(connection, signedTransaction, 'single')
      ).value;
    } catch (e) {
      log.error('Simulate Transaction error', e);
    }
    if (simulateResult && simulateResult.err) {
      if (simulateResult.logs) {
        for (let i = simulateResult.logs.length - 1; i >= 0; --i) {
          const line = simulateResult.logs[i];
          if (line.startsWith('Program log: ')) {
            throw new Error(
                'Transaction failed: ' + line.slice('Program log: '.length),
            );
          }
        }
      }
      throw new Error(JSON.stringify(simulateResult.err));
    }
    log.error('Got this far.');
    // throw new Error('Transaction failed');
  } finally {
    done = true;
  }

  log.debug('Latency (ms)', txid, new Date().getTime() - startTime);
  return { txid, slot };
}

async function simulateTransaction(
    connection: Connection,
    transaction: Transaction,
    commitment: Commitment,
): Promise<RpcResponseAndContext<SimulatedTransactionResponse>> {
  // @ts-ignore
  transaction.recentBlockhash = await connection.getLatestBlockhash(
      // @ts-ignore
      connection._disableBlockhashCaching,
  );

  const signData = transaction.serializeMessage();
  // @ts-ignore
  const wireTransaction = transaction._serialize(signData);
  const encodedTransaction = wireTransaction.toString('base64');
  const config: any = { encoding: 'base64', commitment };
  const args = [encodedTransaction, config];

  // @ts-ignore
  const res = await connection._rpcRequest('simulateTransaction', args);
  if (res.error) {
    throw new Error('failed to simulate transaction: ' + res.error.message);
  }
  return res.result;
}

async function awaitTransactionSignatureConfirmation(
    txid: TransactionSignature,
    timeout: number,
    connection: Connection,
    commitment: Commitment = "recent",
    queryStatus = false,
): Promise<SignatureStatus | null | void> {
  let done = false;
  let status: SignatureStatus | null | void = {
    slot: 0,
    confirmations: 0,
    err: null,
  };
  let subId = 0;
  // eslint-disable-next-line no-async-promise-executor
  status = await new Promise(async (resolve, reject) => {
    setTimeout(() => {
      if (done) {
        return;
      }
      done = true;
      log.warn('Rejecting for timeout...');
      reject({ timeout: true });
    }, timeout);
    try {
      subId = connection.onSignature(
          txid,
          (result, context) => {
            done = true;
            status = {
              err: result.err,
              slot: context.slot,
              confirmations: 0,
            };
            if (result.err) {
              log.warn('Rejected via websocket', result.err);
              reject(status);
            } else {
              log.debug('Resolved via websocket', result);
              resolve(status);
            }
          },
          commitment,
      );
    } catch (e) {
      done = true;
      log.error('WS error in setup', txid, e);
    }
    while (!done && queryStatus) {
      // eslint-disable-next-line no-loop-func
      (async () => {
        try {
          const signatureStatuses = await connection.getSignatureStatuses([
            txid,
          ]);
          status = signatureStatuses && signatureStatuses.value[0];
          if (!done) {
            if (!status) {
              log.debug('REST null result for', txid, status);
            } else if (status.err) {
              log.error('REST error for', txid, status);
              done = true;
              reject(status.err);
            } else if (!status.confirmations) {
              log.debug('REST no confirmations for', txid, status);
            } else {
              log.debug('REST confirmation for', txid, status);
              done = true;
              resolve(status);
            }
          }
        } catch (e) {
          if (!done) {
            log.error('REST connection error: txid', txid, e);
          }
        }
      })();
    }
  });

  //@ts-ignore
  if (connection._signatureSubscriptions[subId])
    connection.removeSignatureListener(subId);
  done = true;
  log.debug('Returning status', status);
  return status;
}
