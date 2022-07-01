'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var TokenProgram = require('../TokenProgram.cjs');
var splToken = require('@solana/spl-token');
var Pda = require('../../../types/Pda.cjs');

const findAssociatedTokenAccountPda = (mint, owner, tokenProgramId = TokenProgram.TokenProgram.publicKey, associatedTokenProgramId = splToken.ASSOCIATED_TOKEN_PROGRAM_ID) => {
  return Pda.Pda.find(associatedTokenProgramId, [owner.toBuffer(), tokenProgramId.toBuffer(), mint.toBuffer()]);
};

exports.findAssociatedTokenAccountPda = findAssociatedTokenAccountPda;
//# sourceMappingURL=findAssociatedTokenAccountPda.cjs.map
