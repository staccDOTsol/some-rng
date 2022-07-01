import { SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { cusper } from '@metaplex-foundation/mpl-token-metadata';
import { cusper as cusper$1 } from '@metaplex-foundation/mpl-auction-house';
import { TokenMetadataProgram } from '../../programs/tokenMetadata/TokenMetadataProgram.mjs';
import { TokenMetadataGpaBuilder } from '../../programs/tokenMetadata/gpaBuilders/TokenMetadataGpaBuilder.mjs';
import { AuctionHouseProgram } from '../../programs/auctionHouse/AuctionHouseProgram.mjs';

const corePrograms = () => ({
  install(metaplex) {
    // System Program.
    metaplex.programs().register({
      name: 'SystemProgram',
      address: SystemProgram.programId
    }); // Token Program.

    metaplex.programs().register({
      name: 'TokenProgram',
      address: TOKEN_PROGRAM_ID
    }); // Token Metadata Program.

    metaplex.programs().register({
      name: 'TokenMetadataProgram',
      address: TokenMetadataProgram.publicKey,
      errorResolver: error => cusper.errorFromProgramLogs(error.logs, false),
      gpaResolver: metaplex => new TokenMetadataGpaBuilder(metaplex, TokenMetadataProgram.publicKey)
    }); // Auction House Program.

    metaplex.programs().register({
      name: 'AuctionHouseProgram',
      address: AuctionHouseProgram.publicKey,
      errorResolver: error => cusper$1.errorFromProgramLogs(error.logs, false)
    });
  }

});

export { corePrograms };
//# sourceMappingURL=plugin.mjs.map
