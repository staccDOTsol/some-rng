import { createCreateAuctionHouseInstruction } from '@metaplex-foundation/mpl-auction-house';

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
    instruction: createCreateAuctionHouseInstruction({
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

export { createCreateAuctionHouseInstructionWithSigners };
//# sourceMappingURL=createCreateAuctionHouseInstructionWithSigners.mjs.map
