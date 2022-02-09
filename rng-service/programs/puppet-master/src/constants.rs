

pub const HOUSE_SIZE: usize = 8 + //key
    32 + // fee payer
    32 + // treasury
    32 + // treasury_withdrawal_destination
    32 + // fee withdrawal destination
    32 + // treasury mint
    32 + // house_author
    32 + // house_operator
    1  + // bump
    1  + // treasury_bump
    1  + // fee_payer_bump
    2  + // fee basis points
    220; // padding
