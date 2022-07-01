'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var AuctionHouseClient = require('./AuctionHouseClient.cjs');
var createAuctionHouse = require('./createAuctionHouse.cjs');
var findAuctionHouseByAddress = require('./findAuctionHouseByAddress.cjs');
var updateAuctionHouse = require('./updateAuctionHouse.cjs');

const auctionHouseModule = () => ({
  install(metaplex) {
    const op = metaplex.operations();
    op.register(createAuctionHouse.createAuctionHouseOperation, createAuctionHouse.createAuctionHouseOperationHandler);
    op.register(updateAuctionHouse.updateAuctionHouseOperation, updateAuctionHouse.updateAuctionHouseOperationHandler);
    op.register(findAuctionHouseByAddress.findAuctionHouseByAddressOperation, findAuctionHouseByAddress.findAuctionHouseByAddressOperationHandler);

    metaplex.auctions = function () {
      return new AuctionHouseClient.AuctionHouseClient(this);
    };
  }

});

exports.auctionHouseModule = auctionHouseModule;
//# sourceMappingURL=plugin.cjs.map
