use anchor_lang::prelude::*;

use crate::constants::{PREFIX, TREASURY};
use crate::errors::ErrorCode;
use crate::instructions::uncover::Uncover;
use crate::utils::{transfer_sol, transfer_token};

pub fn uncover_dice(ctx: Context<Uncover>, first: char, index: usize) -> ProgramResult {
    let headstruehighrolltrue = ctx.accounts.puppet.headstruehighrolltrue.clone();
    let is_native = ctx.accounts.house.mint.key() == spl_token::native_mint::id();
    let second = index.to_string().chars().nth(0).unwrap();
    let ran: u64 = ((first.to_string() + &second.to_string()).parse::<u64>().unwrap()).checked_add(1 as u64).ok_or(ErrorCode::NumericalOverflowError)?;//.parse::<f32>().unwrap();
    let number: u64 = ctx.accounts.puppet.number as u64;

    msg!(&first.to_string());
    msg!(&second.to_string());
    msg!(&ran.to_string());
    msg!(&number.to_string());

    if (((number as f32) >= (ran as f32)) && headstruehighrolltrue == false) || (((number as f32) < (ran as f32)) && headstruehighrolltrue == true) {
        let payout: f32;
        if headstruehighrolltrue == false {
            payout = (100.0 / (number as f32)) * 1000000000 as f32;
            msg!(&payout.to_string());
        } else {
            let chance: f32 = 100.0 - (number as f32) as f32;
            payout = (100.0 / chance) * 1000000000 as f32;

            msg!(&payout.to_string());
        }

        if is_native {
            transfer_sol(
                &ctx.accounts.operator_treasury.key(),
                &ctx.accounts.user.key(),
                ctx.accounts.puppet.bet.checked_mul(payout as u64).ok_or(ErrorCode::NumericalOverflowError)?
                    .checked_div(1000000000 as u64).ok_or(ErrorCode::NumericalOverflowError)?,
                &[
                    ctx.accounts.operator_treasury.to_account_info().clone(),
                    ctx.accounts.user.to_account_info().clone(),
                    ctx.accounts.system_program.to_account_info().clone(),
                ],
                Option::Some(
                    &[&[
                        PREFIX.as_bytes(),
                        TREASURY.as_bytes(),
                        &ctx.accounts.house.key().to_bytes(),
                        &ctx.accounts.house.author.to_bytes(),
                        &ctx.accounts.house.operator.to_bytes(),
                        &[ctx.accounts.house.operator_treasury_bump]]]),
            )?;
            ctx.accounts.puppet.data = ran;
        } else {
            transfer_token(
                &ctx.accounts.token_program.key,
                &ctx.accounts.operator_treasury.key(),
                &ctx.accounts.payment_account.key(),
                &ctx.accounts.house.key(),
                ctx.accounts.puppet.bet.checked_mul(payout as u64).ok_or(ErrorCode::NumericalOverflowError)?
                    .checked_div(1000000000 as u64).ok_or(ErrorCode::NumericalOverflowError)?,
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
                    &[ctx.accounts.house.house_bump]]]),
            )?;
            ctx.accounts.puppet.data = ran;
        }
    }
    Ok(())
}
