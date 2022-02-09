use anchor_lang::prelude::*;
use crate::constants::seeds::*;

/*
pub fn operator_treasury_seeds<'a>(house_key: &'a Pubkey,
                                   author_key: &'a Pubkey,
                                   operator_key: &'a Pubkey,
                                   operator_treasury_bump: u8) -> &'a[&'a [u8]; 6] {
    // #[account(seeds=[PREFIX.as_ref(), TREASURY.as_ref(), &house.key().to_bytes(), &author.key.to_bytes(), &operator.key.to_bytes()], bump=operator_treasury_bump)]
    &[
        PREFIX.as_bytes(),
        TREASURY.as_bytes(),
        house_key.as_ref(),
        author_key.as_ref(),
        operator_key.as_ref(),
        &[operator_treasury_bump],
    ]
}

pub fn operator_fee_account_seeds<'a>(house_key: Pubkey,
                                      author_key: Pubkey,
                                      operator_key: Pubkey,
                                      operator_fee_bump: u8) -> &'a[&'a [u8]; 6] {
    //  #[account(seeds=[PREFIX.as_ref(), FEES.as_ref(), &house.key().to_bytes(), &author.key.to_bytes(), &operator.key.to_bytes()], bump=operator_fee_bump)]
    &[
        PREFIX.as_bytes(),
        FEES.as_bytes(),
        house_key.as_ref(),
        author_key.as_ref(),
        operator_key.as_ref(),
        &[operator_fee_bump],
    ]
}


pub fn author_fee_account_seeds<'a>(house_key: Pubkey,
                                    author_key: Pubkey,
                                    operator_key: Pubkey,
                                    author_fee_bump: u8) -> &'a[&'a [u8]; 6] {
    // #[account(seeds=[PREFIX.as_ref(), FEES.as_ref(), &house.key().to_bytes(), &author.key.to_bytes(), &operator.key.to_bytes()], bump=author_fee_bump)]
    &[
        PREFIX.as_bytes(),
        FEES.as_bytes(),
        house_key.as_ref(),
        author_key.as_ref(),
        operator_key.as_ref(),
        &[author_fee_bump],
    ]
}


 */
