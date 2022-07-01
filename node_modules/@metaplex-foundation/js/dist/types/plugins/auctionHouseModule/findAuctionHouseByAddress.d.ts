import type { Commitment, PublicKey } from '@solana/web3.js';
import { Operation, OperationHandler } from "../../types";
import { AuctionHouse } from './AuctionHouse';
declare const Key: "FindAuctionHouseByAddressOperation";
export declare const findAuctionHouseByAddressOperation: import("../../types").OperationConstructor<FindAuctionHouseByAddressOperation, "FindAuctionHouseByAddressOperation", FindAuctionHouseByAddressOperationInput, AuctionHouse>;
export declare type FindAuctionHouseByAddressOperation = Operation<typeof Key, FindAuctionHouseByAddressOperationInput, AuctionHouse>;
export declare type FindAuctionHouseByAddressOperationInput = {
    address: PublicKey;
    commitment?: Commitment;
};
export declare const findAuctionHouseByAddressOperationHandler: OperationHandler<FindAuctionHouseByAddressOperation>;
export {};
