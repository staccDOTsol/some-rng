'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var buffer = require('buffer');
var AuctionHouseProgram = require('../AuctionHouseProgram.cjs');
var Pda = require('../../../types/Pda.cjs');

const findAuctionHouseFeePda = (auctionHouse, programId = AuctionHouseProgram.AuctionHouseProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('auction_house', 'utf8'), auctionHouse.toBuffer(), buffer.Buffer.from('fee_payer', 'utf8')]);
};

exports.findAuctionHouseFeePda = findAuctionHouseFeePda;
//# sourceMappingURL=findAuctionHouseFeePda.cjs.map
