import { createAuctionHouseBuilder } from './createAuctionHouse.mjs';
import { updateAuctionHouseBuilder } from './updateAuctionHouse.mjs';

class AuctionHouseBuildersClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  createAuctionHouse(input) {
    return createAuctionHouseBuilder(this.metaplex, input);
  }

  updateAuctionHouse(input) {
    return updateAuctionHouseBuilder(this.metaplex, input);
  }

}

export { AuctionHouseBuildersClient };
//# sourceMappingURL=AuctionHouseBuildersClient.mjs.map
