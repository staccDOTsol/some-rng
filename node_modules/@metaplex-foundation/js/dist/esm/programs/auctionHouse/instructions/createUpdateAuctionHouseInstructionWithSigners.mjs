import { createUpdateAuctionHouseInstruction } from '@metaplex-foundation/mpl-auction-house';

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
    instruction: createUpdateAuctionHouseInstruction({
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

export { createUpdateAuctionHouseInstructionWithSigners };
//# sourceMappingURL=createUpdateAuctionHouseInstructionWithSigners.mjs.map
