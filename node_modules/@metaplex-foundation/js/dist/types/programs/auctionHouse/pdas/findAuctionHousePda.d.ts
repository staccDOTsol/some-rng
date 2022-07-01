import { PublicKey } from '@solana/web3.js';
import { Pda } from "../../../types";
export declare const findAuctionHousePda: (creator: PublicKey, treasuryMint: PublicKey, programId?: PublicKey) => Pda;
