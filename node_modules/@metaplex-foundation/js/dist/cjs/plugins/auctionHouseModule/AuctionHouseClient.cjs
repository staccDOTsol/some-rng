'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var AuctionHouseBuildersClient = require('./AuctionHouseBuildersClient.cjs');
var createAuctionHouse = require('./createAuctionHouse.cjs');
var findAuctionHouseByAddress = require('./findAuctionHouseByAddress.cjs');
var updateAuctionHouse = require('./updateAuctionHouse.cjs');
var Task = require('../../utils/Task.cjs');
var findAuctionHousePda = require('../../programs/auctionHouse/pdas/findAuctionHousePda.cjs');

class AuctionHouseClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  builders() {
    return new AuctionHouseBuildersClient.AuctionHouseBuildersClient(this.metaplex);
  }

  createAuctionHouse(input) {
    return new Task.Task(async scope => {
      const output = await this.metaplex.operations().getTask(createAuctionHouse.createAuctionHouseOperation(input)).run(scope);
      scope.throwIfCanceled();
      const auctionHouse = await this.findAuctionHouseByAddress(output.auctionHouse).run(scope);
      return { ...output,
        auctionHouse
      };
    });
  }

  updateAuctionHouse(auctionHouse, input) {
    return new Task.Task(async scope => {
      const output = await this.metaplex.operations().getTask(updateAuctionHouse.updateAuctionHouseOperation({
        auctionHouse,
        ...input
      })).run(scope);
      scope.throwIfCanceled();
      const updatedAuctionHouse = await this.findAuctionHouseByAddress(auctionHouse.address).run(scope);
      return { ...output,
        auctionHouse: updatedAuctionHouse
      };
    });
  }

  findAuctionHouseByAddress(address, commitment) {
    return this.metaplex.operations().getTask(findAuctionHouseByAddress.findAuctionHouseByAddressOperation({
      address,
      commitment
    }));
  }

  findAuctionHouseByCreatorAndMint(creator, treasuryMint, commitment) {
    return this.findAuctionHouseByAddress(findAuctionHousePda.findAuctionHousePda(creator, treasuryMint), commitment);
  }

}

exports.AuctionHouseClient = AuctionHouseClient;
//# sourceMappingURL=AuctionHouseClient.cjs.map
