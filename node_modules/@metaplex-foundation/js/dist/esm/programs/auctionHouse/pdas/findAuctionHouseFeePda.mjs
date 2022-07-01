import { Buffer } from 'buffer';
import { AuctionHouseProgram } from '../AuctionHouseProgram.mjs';
import { Pda } from '../../../types/Pda.mjs';

const findAuctionHouseFeePda = (auctionHouse, programId = AuctionHouseProgram.publicKey) => {
  return Pda.find(programId, [Buffer.from('auction_house', 'utf8'), auctionHouse.toBuffer(), Buffer.from('fee_payer', 'utf8')]);
};

export { findAuctionHouseFeePda };
//# sourceMappingURL=findAuctionHouseFeePda.mjs.map
