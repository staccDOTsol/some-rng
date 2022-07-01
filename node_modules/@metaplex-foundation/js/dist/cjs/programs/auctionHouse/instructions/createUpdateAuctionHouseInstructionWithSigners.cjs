'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');

const createUpdateAuctionHouseInstructionWithSigners = params => {
  const {
    treasuryMint,
    payer,
    authority,
    newAuthority,
    feeWithdrawalDestination,
    treasuryWithdrawalDestination,
    treasuryWithdrawalDestinationOwner,
    auctionHouse,
    args,
    instructionKey = 'updateAuctionHouse'
  } = params;
  return {
    instruction: mplAuctionHouse.createUpdateAuctionHouseInstruction({
      treasuryMint,
      payer: payer.publicKey,
      authority: authority.publicKey,
      newAuthority,
      feeWithdrawalDestination,
      treasuryWithdrawalDestination,
      treasuryWithdrawalDestinationOwner,
      auctionHouse
    }, args),
    signers: [payer, authority],
    key: instructionKey
  };
};

exports.createUpdateAuctionHouseInstructionWithSigners = createUpdateAuctionHouseInstructionWithSigners;
//# sourceMappingURL=createUpdateAuctionHouseInstructionWithSigners.cjs.map
