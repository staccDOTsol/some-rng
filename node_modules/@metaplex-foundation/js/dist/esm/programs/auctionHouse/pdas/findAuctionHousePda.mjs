import { Buffer } from 'buffer';
import { AuctionHouseProgram } from '../AuctionHouseProgram.mjs';
import { Pda } from '../../../types/Pda.mjs';

const findAuctionHousePda = (creator, treasuryMint, programId = AuctionHouseProgram.publicKey) => {
  return Pda.find(programId, [Buffer.from('auction_house', 'utf8'), creator.toBuffer(), treasuryMint.toBuffer()]);
};

export { findAuctionHousePda };
//# sourceMappingURL=findAuctionHousePda.mjs.map
