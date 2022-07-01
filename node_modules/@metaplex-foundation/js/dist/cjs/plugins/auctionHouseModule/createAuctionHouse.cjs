'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('./constants.cjs');
var Operation = require('../../types/Operation.cjs');
var findAuctionHousePda = require('../../programs/auctionHouse/pdas/findAuctionHousePda.cjs');
var findAuctionHouseFeePda = require('../../programs/auctionHouse/pdas/findAuctionHouseFeePda.cjs');
var findAuctionHouseTreasuryPda = require('../../programs/auctionHouse/pdas/findAuctionHouseTreasuryPda.cjs');
var findAssociatedTokenAccountPda = require('../../programs/token/pdas/findAssociatedTokenAccountPda.cjs');
var createCreateAuctionHouseInstructionWithSigners = require('../../programs/auctionHouse/instructions/createCreateAuctionHouseInstructionWithSigners.cjs');
var TransactionBuilder = require('../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'CreateAuctionHouseOperation';
const createAuctionHouseOperation = Operation.useOperation(Key);
// -----------------
// Handler
// -----------------
const createAuctionHouseOperationHandler = {
  handle: async (operation, metaplex) => {
    const builder = createAuctionHouseBuilder(metaplex, operation.input);
    const response = await metaplex.rpc().sendAndConfirmTransaction(builder, undefined, operation.input.confirmOptions);
    return {
      response,
      ...builder.getContext()
    };
  }
}; // -----------------
// Builder
// -----------------

const createAuctionHouseBuilder = (metaplex, params) => {
  var _params$canChangeSale, _params$requiresSignO, _params$authority, _params$payer, _params$treasuryMint, _params$treasuryWithd, _params$feeWithdrawal;

  // Data.
  const canChangeSalePrice = (_params$canChangeSale = params.canChangeSalePrice) !== null && _params$canChangeSale !== void 0 ? _params$canChangeSale : false;
  const requiresSignOff = (_params$requiresSignO = params.requiresSignOff) !== null && _params$requiresSignO !== void 0 ? _params$requiresSignO : canChangeSalePrice; // Accounts.

  const authority = (_params$authority = params.authority) !== null && _params$authority !== void 0 ? _params$authority : metaplex.identity().publicKey;
  const payer = (_params$payer = params.payer) !== null && _params$payer !== void 0 ? _params$payer : metaplex.identity();
  const treasuryMint = (_params$treasuryMint = params.treasuryMint) !== null && _params$treasuryMint !== void 0 ? _params$treasuryMint : constants.WRAPPED_SOL_MINT;
  const treasuryWithdrawalDestinationOwner = (_params$treasuryWithd = params.treasuryWithdrawalDestinationOwner) !== null && _params$treasuryWithd !== void 0 ? _params$treasuryWithd : metaplex.identity().publicKey;
  const feeWithdrawalDestination = (_params$feeWithdrawal = params.feeWithdrawalDestination) !== null && _params$feeWithdrawal !== void 0 ? _params$feeWithdrawal : metaplex.identity().publicKey; // PDAs.

  const auctionHouse = findAuctionHousePda.findAuctionHousePda(authority, treasuryMint);
  const auctionHouseFeeAccount = findAuctionHouseFeePda.findAuctionHouseFeePda(auctionHouse);
  const auctionHouseTreasury = findAuctionHouseTreasuryPda.findAuctionHouseTreasuryPda(auctionHouse);
  const treasuryWithdrawalDestination = treasuryMint.equals(constants.WRAPPED_SOL_MINT) ? treasuryWithdrawalDestinationOwner : findAssociatedTokenAccountPda.findAssociatedTokenAccountPda(treasuryMint, treasuryWithdrawalDestinationOwner);
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer).setContext({
    auctionHouse,
    auctionHouseFeeAccount,
    auctionHouseTreasury,
    treasuryWithdrawalDestination
  }).add(createCreateAuctionHouseInstructionWithSigners.createCreateAuctionHouseInstructionWithSigners({
    treasuryMint,
    payer,
    authority,
    feeWithdrawalDestination,
    treasuryWithdrawalDestination,
    treasuryWithdrawalDestinationOwner,
    auctionHouse,
    auctionHouseFeeAccount,
    auctionHouseTreasury,
    args: {
      bump: auctionHouse.bump,
      feePayerBump: auctionHouseFeeAccount.bump,
      treasuryBump: auctionHouseTreasury.bump,
      sellerFeeBasisPoints: params.sellerFeeBasisPoints,
      requiresSignOff,
      canChangeSalePrice
    },
    instructionKey: params.instructionKey
  }));
};

exports.createAuctionHouseBuilder = createAuctionHouseBuilder;
exports.createAuctionHouseOperation = createAuctionHouseOperation;
exports.createAuctionHouseOperationHandler = createAuctionHouseOperationHandler;
//# sourceMappingURL=createAuctionHouse.cjs.map
