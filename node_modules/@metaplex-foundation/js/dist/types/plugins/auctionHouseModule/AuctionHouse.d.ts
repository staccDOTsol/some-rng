import type { PublicKey } from '@solana/web3.js';
import { AuctionHouseAccount } from "../../programs";
import { Model, Pda } from "../../types";
export declare class AuctionHouse extends Model {
    readonly address: Pda;
    readonly creator: PublicKey;
    readonly authority: PublicKey;
    readonly treasuryMint: PublicKey;
    readonly feeAccount: Pda;
    readonly treasuryAccount: Pda;
    readonly feeWithdrawalDestination: PublicKey;
    readonly treasuryWithdrawalDestination: PublicKey;
    readonly sellerFeeBasisPoints: number;
    readonly requiresSignOff: boolean;
    readonly canChangeSalePrice: boolean;
    constructor(account: AuctionHouseAccount);
    usesSol(): boolean;
}
