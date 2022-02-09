use anchor_lang::prelude::*;
use crate::constants::{PREFIX, TREASURY};
use crate::errors::ErrorCode;
use crate::instructions::uncover::Uncover;
use crate::utils::{transfer_sol, transfer_token};

pub fn uncover_flipcoin(ctx: Context<Uncover>, firstf2: f32) -> ProgramResult {
    let is_native = ctx.accounts.house.mint.key() == spl_token::native_mint::id();

    if firstf2 <= 4.0 {
        msg!("1");
        if is_native {
            // SOL
            transfer_sol(
                &ctx.accounts.operator_treasury.key(),
                &ctx.accounts.user.key() ,
                ctx.accounts.puppet.bet.checked_mul(2).ok_or(ErrorCode::NumericalOverflowError)?,
                &[
                    ctx.accounts.operator_treasury.to_account_info().clone(),
                    ctx.accounts.user.to_account_info().clone(),
                    ctx.accounts.system_program.to_account_info().clone(),
                ],
                Option::Some(
                    &[&[PREFIX.as_bytes(),
                        TREASURY.as_bytes(),
                        &ctx.accounts.house.key().to_bytes(),
                        &ctx.accounts.house.author.to_bytes(),
                        &ctx.accounts.house.operator.to_bytes(),
                        &[ctx.accounts.house.operator_treasury_bump]]]),
            )?;
        } else {
            // TOKEN
            transfer_token(
                &ctx.accounts.token_program.key,
                &ctx.accounts.operator_treasury.key(),
                &ctx.accounts.payment_account.key(),
                &ctx.accounts.house.key(),
                ctx.accounts.puppet.bet.checked_mul(2).ok_or(ErrorCode::NumericalOverflowError)?,
                &[
                    ctx.accounts.house.to_account_info().clone(),
                    ctx.accounts.operator_treasury.to_account_info().clone(),
                    ctx.accounts.payment_account.to_account_info().clone(),
                    ctx.accounts.system_program.to_account_info().clone(),
                ],
                Option::Some(&[&[
                    PREFIX.as_bytes(),
                    &ctx.accounts.house.author.to_bytes(),
                    &ctx.accounts.house.operator.to_bytes(),
                    &[ctx.accounts.house.house_bump]]])
            )?;
        }
        Ok(())
    } else {
        return Err(ErrorCode::Lost.into());
    }
}
