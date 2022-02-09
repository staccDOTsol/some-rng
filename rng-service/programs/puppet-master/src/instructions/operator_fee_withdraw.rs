use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::solana_program::system_instruction;

use crate::errors::errorcodes::ErrorCode;
use crate::structs::house::House;

pub fn operator_fee_withdraw(ctx: Context<OperatorFeeWithdraw>, sol: u64) -> ProgramResult {
    let house = &ctx.accounts.house;
    let operator_fee_account = &ctx.accounts.operator_fee_account;
    let operator_fee_destination = &ctx.accounts.operator_fee_destination;

    if sol > operator_fee_account.lamports() {

        return Err(ErrorCode::NotEnoughSOL.into());
    }
    invoke_signed(
        &system_instruction::transfer(&operator_fee_account.key(), &operator_fee_destination.key(), sol),
        &[
            operator_fee_account.to_account_info().clone(),
            operator_fee_destination.to_account_info().clone(),
            ctx.accounts.system_program.to_account_info().clone(),
        ],//, &house.key().to_bytes(), author.key.as_ref(), operator.key.as_ref()
        &[&["rng_house".as_bytes(), "fees".as_bytes(), &house.key().to_bytes(), &house.author.to_bytes(), &house.operator.to_bytes(), &[house.operator_fee_bump]]],
    )?;
    Ok(())
}


#[derive(Accounts)]
pub struct OperatorFeeWithdraw<'info> {

    #[account(seeds=[b"rng_house".as_ref(), &house.author.to_bytes(), &house.operator.to_bytes()], bump=house.house_bump)]
    house: Account<'info, House>,
    #[account(mut, address=house.operator_fee_account)]
    operator_fee_account: AccountInfo<'info>,
    #[account(mut, address=house.operator_fee_destination)]
    operator_fee_destination: AccountInfo<'info>,
    #[account(mut, address=house.operator)]
    operator: Signer<'info>,
    pub system_program: Program<'info, System>,
}
