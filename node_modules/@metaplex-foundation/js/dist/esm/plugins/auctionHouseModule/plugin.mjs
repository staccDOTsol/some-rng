import { AuctionHouseClient } from './AuctionHouseClient.mjs';
import { createAuctionHouseOperation, createAuctionHouseOperationHandler } from './createAuctionHouse.mjs';
import { findAuctionHouseByAddressOperation, findAuctionHouseByAddressOperationHandler } from './findAuctionHouseByAddress.mjs';
import { updateAuctionHouseOperation, updateAuctionHouseOperationHandler } from './updateAuctionHouse.mjs';

const auctionHouseModule = () => ({
  install(metaplex) {
    const op = metaplex.operations();
    op.register(createAuctionHouseOperation, createAuctionHouseOperationHandler);
    op.register(updateAuctionHouseOperation, updateAuctionHouseOperationHandler);
    op.register(findAuctionHouseByAddressOperation, findAuctionHouseByAddressOperationHandler);

    metaplex.auctions = function () {
      return new AuctionHouseClient(this);
    };
  }

});

export { auctionHouseModule };
//# sourceMappingURL=plugin.mjs.map
