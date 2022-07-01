import { PublicKey } from '@solana/web3.js';
import { Signer } from "../../../types";
import { InstructionWithSigners } from "../../../utils";
import { CreateAuctionHouseInstructionArgs } from '@metaplex-foundation/mpl-auction-house';
export declare type CreateCreateAuctionHouseInstructionWithSignersParams = {
    treasuryMint: PublicKey;
    payer: Signer;
    authority: PublicKey;
    feeWithdrawalDestination: PublicKey;
    treasuryWithdrawalDestination: PublicKey;
    treasuryWithdrawalDestinationOwner: PublicKey;
    auctionHouse: PublicKey;
    auctionHouseFeeAccount: PublicKey;
    auctionHouseTreasury: PublicKey;
    args: CreateAuctionHouseInstructionArgs;
    instructionKey?: string;
};
export declare const createCreateAuctionHouseInstructionWithSigners: (params: CreateCreateAuctionHouseInstructionWithSignersParams) => InstructionWithSigners;
