'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var splToken = require('@solana/spl-token');
var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var TokenMetadataProgram = require('../../programs/tokenMetadata/TokenMetadataProgram.cjs');
var TokenMetadataGpaBuilder = require('../../programs/tokenMetadata/gpaBuilders/TokenMetadataGpaBuilder.cjs');
var AuctionHouseProgram = require('../../programs/auctionHouse/AuctionHouseProgram.cjs');

const corePrograms = () => ({
  install(metaplex) {
    // System Program.
    metaplex.programs().register({
      name: 'SystemProgram',
      address: web3_js.SystemProgram.programId
    }); // Token Program.

    metaplex.programs().register({
      name: 'TokenProgram',
      address: splToken.TOKEN_PROGRAM_ID
    }); // Token Metadata Program.

    metaplex.programs().register({
      name: 'TokenMetadataProgram',
      address: TokenMetadataProgram.TokenMetadataProgram.publicKey,
      errorResolver: error => mplTokenMetadata.cusper.errorFromProgramLogs(error.logs, false),
      gpaResolver: metaplex => new TokenMetadataGpaBuilder.TokenMetadataGpaBuilder(metaplex, TokenMetadataProgram.TokenMetadataProgram.publicKey)
    }); // Auction House Program.

    metaplex.programs().register({
      name: 'AuctionHouseProgram',
      address: AuctionHouseProgram.AuctionHouseProgram.publicKey,
      errorResolver: error => mplAuctionHouse.cusper.errorFromProgramLogs(error.logs, false)
    });
  }

});

exports.corePrograms = corePrograms;
//# sourceMappingURL=plugin.cjs.map
