'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var buffer = require('buffer');
var AuctionHouseProgram = require('../AuctionHouseProgram.cjs');
var Pda = require('../../../types/Pda.cjs');

const findAuctionHouseTreasuryPda = (auctionHouse, programId = AuctionHouseProgram.AuctionHouseProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('auction_house', 'utf8'), auctionHouse.toBuffer(), buffer.Buffer.from('treasury', 'utf8')]);
};

exports.findAuctionHouseTreasuryPda = findAuctionHouseTreasuryPda;
//# sourceMappingURL=findAuctionHouseTreasuryPda.cjs.map
