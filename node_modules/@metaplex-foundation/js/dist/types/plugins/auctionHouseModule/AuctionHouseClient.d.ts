import type { Metaplex } from "../../Metaplex";
import { Task } from "../../utils";
import type { Commitment, PublicKey } from '@solana/web3.js';
import { AuctionHouse } from './AuctionHouse';
import { AuctionHouseBuildersClient } from './AuctionHouseBuildersClient';
import { CreateAuctionHouseInput, CreateAuctionHouseOutput } from './createAuctionHouse';
import { UpdateAuctionHouseInput, UpdateAuctionHouseOutput } from './updateAuctionHouse';
export declare class AuctionHouseClient {
    protected readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    builders(): AuctionHouseBuildersClient;
    createAuctionHouse(input: CreateAuctionHouseInput): Task<Omit<CreateAuctionHouseOutput, 'auctionHouse'> & {
        auctionHouse: AuctionHouse;
    }>;
    updateAuctionHouse(auctionHouse: AuctionHouse, input: Omit<UpdateAuctionHouseInput, 'auctionHouse'>): Task<UpdateAuctionHouseOutput & {
        auctionHouse: AuctionHouse;
    }>;
    findAuctionHouseByAddress(address: PublicKey, commitment?: Commitment): Task<AuctionHouse>;
    findAuctionHouseByCreatorAndMint(creator: PublicKey, treasuryMint: PublicKey, commitment?: Commitment): Task<AuctionHouse>;
}
