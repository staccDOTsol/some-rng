import { Metaplex } from "../../Metaplex";
import { CreateAuctionHouseBuilderParams } from './createAuctionHouse';
import { UpdateAuctionHouseBuilderParams } from './updateAuctionHouse';
export declare class AuctionHouseBuildersClient {
    protected readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    createAuctionHouse(input: CreateAuctionHouseBuilderParams): import("../..").TransactionBuilder<import("./createAuctionHouse").CreateAuctionHouseBuilderContext>;
    updateAuctionHouse(input: UpdateAuctionHouseBuilderParams): import("../..").TransactionBuilder<object>;
}
