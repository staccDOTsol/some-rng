use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::solana_program::system_instruction;

use crate::errors::errorcodes::ErrorCode;
use crate::structs::house::House;

pub fn author_fee_withdraw(ctx: Context<AuthorFeeWithdraw>, sol: u64) -> ProgramResult {
    let house = &ctx.accounts.house;
    let author_fee_account = &ctx.accounts.author_fee_account;
    let author_fee_account_destination = &ctx.accounts.author_fee_account_destination;

    if sol > author_fee_account.lamports() {

        return Err(ErrorCode::NotEnoughSOL.into());
    }
    invoke_signed(
        &system_instruction::transfer(&author_fee_account.key(), &author_fee_account_destination.key(), sol),
        &[
            author_fee_account.to_account_info().clone(),
            author_fee_account_destination.to_account_info().clone(),
            ctx.accounts.system_program.to_account_info().clone(),
        ],//, &house.key().to_bytes(), author.key.as_ref(), operator.key.as_ref()
        &[&["rng_house".as_bytes(), "fees".as_bytes(), &house.key().to_bytes(), &house.author.to_bytes(), &house.operator.to_bytes(), &[house.author_fee_bump]]],
    )?;
    Ok(())
}



#[derive(Accounts)]
pub struct AuthorFeeWithdraw<'info> {

    #[account(seeds=[b"rng_house".as_ref(), &house.author.to_bytes(), &house.operator.to_bytes()], bump=house.house_bump)]
    house: Account<'info, House>,

    #[account(mut, address=house.author_fee_account)]
    author_fee_account: AccountInfo<'info>,
    #[account(mut, address=house.author_fee_account_destination)]
    author_fee_account_destination: AccountInfo<'info>,
    #[account(mut, address=house.author)]
    author: Signer<'info>,
    pub system_program: Program<'info, System>,
}
