import { WRAPPED_SOL_MINT } from './constants.mjs';
import { Model } from '../../types/Model.mjs';
import { Pda } from '../../types/Pda.mjs';

class AuctionHouse extends Model {
  constructor(account) {
    super();
    this.address = new Pda(account.publicKey, account.data.bump);
    this.creator = account.data.creator;
    this.authority = account.data.authority;
    this.treasuryMint = account.data.treasuryMint;
    this.feeAccount = new Pda(account.data.auctionHouseFeeAccount, account.data.feePayerBump);
    this.treasuryAccount = new Pda(account.data.auctionHouseTreasury, account.data.treasuryBump);
    this.feeWithdrawalDestination = account.data.feeWithdrawalDestination;
    this.treasuryWithdrawalDestination = account.data.treasuryWithdrawalDestination;
    this.sellerFeeBasisPoints = account.data.sellerFeeBasisPoints;
    this.requiresSignOff = account.data.requiresSignOff;
    this.canChangeSalePrice = account.data.canChangeSalePrice;
  }

  usesSol() {
    return this.treasuryMint.equals(WRAPPED_SOL_MINT);
  }

}

export { AuctionHouse };
//# sourceMappingURL=AuctionHouse.mjs.map
