'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('./constants.cjs');
var Model = require('../../types/Model.cjs');
var Pda = require('../../types/Pda.cjs');

class AuctionHouse extends Model.Model {
  constructor(account) {
    super();
    this.address = new Pda.Pda(account.publicKey, account.data.bump);
    this.creator = account.data.creator;
    this.authority = account.data.authority;
    this.treasuryMint = account.data.treasuryMint;
    this.feeAccount = new Pda.Pda(account.data.auctionHouseFeeAccount, account.data.feePayerBump);
    this.treasuryAccount = new Pda.Pda(account.data.auctionHouseTreasury, account.data.treasuryBump);
    this.feeWithdrawalDestination = account.data.feeWithdrawalDestination;
    this.treasuryWithdrawalDestination = account.data.treasuryWithdrawalDestination;
    this.sellerFeeBasisPoints = account.data.sellerFeeBasisPoints;
    this.requiresSignOff = account.data.requiresSignOff;
    this.canChangeSalePrice = account.data.canChangeSalePrice;
  }

  usesSol() {
    return this.treasuryMint.equals(constants.WRAPPED_SOL_MINT);
  }

}

exports.AuctionHouse = AuctionHouse;
//# sourceMappingURL=AuctionHouse.cjs.map
