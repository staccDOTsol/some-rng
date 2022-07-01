'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var AuctionHouse = require('./AuctionHouse.cjs');
var SdkError = require('../../errors/SdkError.cjs');
var AuctionHouseAccount = require('../../programs/auctionHouse/accounts/AuctionHouseAccount.cjs');
var Operation = require('../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindAuctionHouseByAddressOperation';
const findAuctionHouseByAddressOperation = Operation.useOperation(Key);
// -----------------
// Handler
// -----------------
const findAuctionHouseByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const unparsedAccount = await metaplex.rpc().getAccount(address, commitment);

    if (!unparsedAccount.exists) {
      throw new SdkError.AccountNotFoundError(address, 'AuctionHouse');
    }

    const account = AuctionHouseAccount.parseAuctionHouseAccount(unparsedAccount);
    return new AuctionHouse.AuctionHouse(account);
  }
};

exports.findAuctionHouseByAddressOperation = findAuctionHouseByAddressOperation;
exports.findAuctionHouseByAddressOperationHandler = findAuctionHouseByAddressOperationHandler;
//# sourceMappingURL=findAuctionHouseByAddress.cjs.map
