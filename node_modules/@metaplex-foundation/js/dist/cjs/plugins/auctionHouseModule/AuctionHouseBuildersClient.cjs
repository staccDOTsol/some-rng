'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createAuctionHouse = require('./createAuctionHouse.cjs');
var updateAuctionHouse = require('./updateAuctionHouse.cjs');

class AuctionHouseBuildersClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  createAuctionHouse(input) {
    return createAuctionHouse.createAuctionHouseBuilder(this.metaplex, input);
  }

  updateAuctionHouse(input) {
    return updateAuctionHouse.updateAuctionHouseBuilder(this.metaplex, input);
  }

}

exports.AuctionHouseBuildersClient = AuctionHouseBuildersClient;
//# sourceMappingURL=AuctionHouseBuildersClient.cjs.map
