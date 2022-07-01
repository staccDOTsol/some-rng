import type { MetaplexPlugin } from "../../types";
import { AuctionHouseClient } from './AuctionHouseClient';
export declare const auctionHouseModule: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        auctions(): AuctionHouseClient;
    }
}
