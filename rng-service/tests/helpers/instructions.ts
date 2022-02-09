import {
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';
import * as BufferLayout from '@solana/buffer-layout';
import {TOKEN_PROGRAM_ID} from "./constants";

export function closeAccountInstruction(account: PublicKey, dest: PublicKey, owner: PublicKey): TransactionInstruction {
  // @ts-ignore
  const dataLayout = BufferLayout.struct([BufferLayout.u8('instruction')]);
  const data = Buffer.alloc(dataLayout.span);
  dataLayout.encode(
      {
        instruction: 9, // CloseAccount instruction
      },
      data,
  );

  let keys = [
    {pubkey: account, isSigner: false, isWritable: true},
    {pubkey: dest, isSigner: false, isWritable: true},
    {pubkey: owner, isSigner: true, isWritable: false}
  ];

  return new TransactionInstruction({
    keys,
    programId: TOKEN_PROGRAM_ID,
    data,
  });
}
