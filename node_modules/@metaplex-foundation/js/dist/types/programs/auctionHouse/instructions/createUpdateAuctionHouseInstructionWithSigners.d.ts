import { PublicKey } from '@solana/web3.js';
import { Signer } from "../../../types";
import { InstructionWithSigners } from "../../../utils";
import { UpdateAuctionHouseInstructionArgs } from '@metaplex-foundation/mpl-auction-house';
export declare type CreateUpdateAuctionHouseInstructionWithSignersParams = {
    treasuryMint: PublicKey;
    payer: Signer;
    authority: Signer;
    newAuthority: PublicKey;
    feeWithdrawalDestination: PublicKey;
    treasuryWithdrawalDestination: PublicKey;
    treasuryWithdrawalDestinationOwner: PublicKey;
    auctionHouse: PublicKey;
    args: UpdateAuctionHouseInstructionArgs;
    instructionKey?: string;
};
export declare const createUpdateAuctionHouseInstructionWithSigners: (params: CreateUpdateAuctionHouseInstructionWithSignersParams) => InstructionWithSigners;
