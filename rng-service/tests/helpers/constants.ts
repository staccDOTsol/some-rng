import {PublicKey} from "@solana/web3.js";

export const HOUSE_PROGRAM_ID = new PublicKey("37cqo9JLTq26HyVPt6LcLkQ4pcFBm6vUAS2n7GtEvrAd");
export const PREFIX = 'rng_house';
export const FEES = "fees";
export const TREASURY = 'treasury';
export const jare = "4tui4yfA6MNgLhjXmKBATrPvEUGseEeqQrqAyVHintUQ";
export const author = new PublicKey(jare);
export const DEFAULT_TIMEOUT = 30000;
export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
export const WRAPPED_SOL_MINT = new PublicKey('So11111111111111111111111111111111111111112');
// For tokenized tests
export const MINT_ACCOUNT = new PublicKey("GgtQFeVG55cjvh8sh5QekfkhU22yeVHR9MMRGRCPebEZ")
export const LOGS_DIR = `test/logs/${HOUSE_PROGRAM_ID}`;
