use anchor_lang::prelude::*;

#[account]
pub struct Data {
    pub(crate) puppet_bump: u8,
    pub(crate) data: u64,
    pub(crate) user: Pubkey,
    pub(crate) bet: u64,
    pub(crate) uuid: String,
    pub(crate) mode: u8,
    pub(crate) headstruehighrolltrue: bool,
    pub(crate) number: u8
}
