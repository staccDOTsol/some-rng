'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var Account = require('../../../types/Account.cjs');

const parseAuctionHouseAccount = Account.getAccountParsingFunction(mplAuctionHouse.AuctionHouse);

exports.parseAuctionHouseAccount = parseAuctionHouseAccount;
//# sourceMappingURL=AuctionHouseAccount.cjs.map
