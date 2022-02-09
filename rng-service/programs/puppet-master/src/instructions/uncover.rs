use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::solana_program::system_instruction;
use anchor_lang::solana_program::sysvar;
use anchor_spl::token::Token;

use crate::constants::seeds::*;
use crate::errors::errorcodes::ErrorCode;
use crate::games::{uncover_dice, uncover_flipcoin};
use crate::structs::*;
use crate::utils::{transfer_sol, transfer_token};

fn generate_index(ctx: &Context<Uncover>) -> Result<usize, ProgramError> {
    let mut index = ctx.accounts.puppet.data.clone() as usize;
    msg!(&index.to_string());
    index = index.checked_add(1000000000).ok_or(ErrorCode::NumericalOverflowError)?;

    while index > 1000000000 {
        let first = index.to_string().chars().nth(0).unwrap();
        let mut firstf2: u32 = first.to_string().parse::<u32>().unwrap();
        firstf2 = firstf2.checked_add(1 as u32).ok_or(ErrorCode::NumericalOverflowError)?;
        firstf2 = firstf2.checked_mul(10 as u32).ok_or(ErrorCode::NumericalOverflowError)?;
        let last = index.to_string().chars().nth(0).unwrap();
        let mut lastf2: u32 = last.to_string().parse::<u32>().unwrap();
        lastf2 = lastf2.checked_add(1 as u32).ok_or(ErrorCode::NumericalOverflowError)?;
        lastf2 = lastf2.checked_mul(10 as u32).ok_or(ErrorCode::NumericalOverflowError)?;
        index = index.checked_div(lastf2 as usize).ok_or(ErrorCode::NumericalOverflowError)?.checked_div(firstf2 as usize).ok_or(ErrorCode::NumericalOverflowError)?;
    }
    Ok(index)
}

pub fn uncover(ctx: Context<Uncover>) -> ProgramResult {
    let mode = ctx.accounts.puppet.mode.clone() as f32;
    msg!(&mode.to_string());
    let index = generate_index(&ctx)?;
    let first = index.to_string().chars().last().unwrap();
    let firstf2: f32 = first.to_string().parse::<f32>().unwrap();

    msg!(&index.to_string());
    msg!(&firstf2.to_string());
    ctx.accounts.puppet.data = 777;

    if mode as f32 == 0.0 {
        uncover_flipcoin(ctx, firstf2)?;
        Ok(())
    } else if mode as f32 == 1.0 {
        uncover_dice(ctx, first, index)?;
        Ok(())
    } else {
        ctx.accounts.puppet.data = 777;
        return Err(ErrorCode::Lost.into());
    }
}

#[derive(Accounts)]
pub struct Uncover<'info> {
    #[account(mut, seeds = [PREFIX.as_bytes(), & user.key().to_bytes(), & house.key().to_bytes(), & puppet.uuid.as_bytes()], bump = puppet.puppet_bump)]
    pub puppet: Account<'info, Data>,
    #[account(mut, address = puppet.user)]
    pub user: AccountInfo<'info>,
    #[account(mut)]
    pub(crate) payment_account: UncheckedAccount<'info>,
    #[account(address = sysvar::recent_blockhashes::id())]
    recent_blockhashes: AccountInfo<'info>,
    #[account(seeds = [PREFIX.as_bytes(), & house.author.to_bytes(), & house.operator.to_bytes()], bump = house.house_bump)]
    pub(crate) house: Account<'info, House>,
    #[account(mut, seeds = [PREFIX.as_bytes(), TREASURY.as_bytes(), & house.key().to_bytes(), & house.author.to_bytes(), & house.operator.to_bytes()], bump = house.operator_treasury_bump)]
    pub(crate) operator_treasury: AccountInfo<'info>,
    #[account(mut)]
    operator: Signer<'info>,
    #[account(mut, seeds = [PREFIX.as_bytes(), FEES.as_bytes(), & house.key().to_bytes(), & house.author.to_bytes(), & house.operator.to_bytes()], bump = house.author_fee_bump)]
    author_fee_account: AccountInfo<'info>,
    #[account(mut, seeds = [PREFIX.as_bytes(), FEES.as_bytes(), & house.key().to_bytes(), & house.author.to_bytes(), & house.operator.to_bytes()], bump = house.operator_fee_bump)]
    operator_fee_account: AccountInfo<'info>,
    pub(crate) token_program: Program<'info, Token>,
    pub(crate) system_program: Program<'info, System>,
}
