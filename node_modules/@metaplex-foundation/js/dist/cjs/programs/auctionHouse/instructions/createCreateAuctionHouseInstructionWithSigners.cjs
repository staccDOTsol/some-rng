'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');

const createCreateAuctionHouseInstructionWithSigners = params => {
  const {
    treasuryMint,
    payer,
    authority,
    feeWithdrawalDestination,
    treasuryWithdrawalDestination,
    treasuryWithdrawalDestinationOwner,
    auctionHouse,
    auctionHouseFeeAccount,
    auctionHouseTreasury,
    args,
    instructionKey = 'createAuctionHouse'
  } = params;
  return {
    instruction: mplAuctionHouse.createCreateAuctionHouseInstruction({
      treasuryMint,
      payer: payer.publicKey,
      authority,
      feeWithdrawalDestination,
      treasuryWithdrawalDestination,
      treasuryWithdrawalDestinationOwner,
      auctionHouse,
      auctionHouseFeeAccount,
      auctionHouseTreasury
    }, args),
    signers: [payer],
    key: instructionKey
  };
};

exports.createCreateAuctionHouseInstructionWithSigners = createCreateAuctionHouseInstructionWithSigners;
//# sourceMappingURL=createCreateAuctionHouseInstructionWithSigners.cjs.map
