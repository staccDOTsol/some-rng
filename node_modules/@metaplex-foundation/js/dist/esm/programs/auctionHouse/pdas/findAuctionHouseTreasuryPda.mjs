import { Buffer } from 'buffer';
import { AuctionHouseProgram } from '../AuctionHouseProgram.mjs';
import { Pda } from '../../../types/Pda.mjs';

const findAuctionHouseTreasuryPda = (auctionHouse, programId = AuctionHouseProgram.publicKey) => {
  return Pda.find(programId, [Buffer.from('auction_house', 'utf8'), auctionHouse.toBuffer(), Buffer.from('treasury', 'utf8')]);
};

export { findAuctionHouseTreasuryPda };
//# sourceMappingURL=findAuctionHouseTreasuryPda.mjs.map
