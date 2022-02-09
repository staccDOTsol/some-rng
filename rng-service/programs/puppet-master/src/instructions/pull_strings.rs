use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::system_instruction;
use anchor_lang::solana_program::sysvar;
use anchor_spl::token::Token;
use arrayref::array_ref;
use anchor_lang::solana_program::clock;
use spl_associated_token_account::get_associated_token_address;

use crate::utils::hashing::*;
use crate::errors::errorcodes::ErrorCode;
use crate::structs::house::House;
use crate::structs::data::Data;
use crate::utils::{assert_is_ata, assert_keys_equal};
use crate::constants::seeds::*;

pub fn pull_strings(ctx: Context<PullStrings>, bet: u64, mode: u8, headstruehighrolltrue: bool, number: u8, puppet_bump: u8) -> ProgramResult {
    if mode == 1 && (number < 1 || number > 100) {
        return Err(ErrorCode::BadChoices.into());
    }
    let recent_blockhashes = &ctx.accounts.recent_blockhashes;
    let user = &ctx.accounts.user;
    let house = &ctx.accounts.house;
    if user.lamports() < bet {
        return Err(ErrorCode::NotEnoughSOL.into());
    }
    let puppet = &mut ctx.accounts.puppet;

    let user_head = user.key;
    let fee1 = bet.checked_div(10000).ok_or(ErrorCode::NumericalOverflowError)?
        .checked_mul(house.fee_basis_points as u64).ok_or(ErrorCode::NumericalOverflowError)?;
    let fee2 = bet.checked_div(10000).ok_or(ErrorCode::NumericalOverflowError)?
        .checked_mul((house.fee_basis_points  as u64).checked_div(15).ok_or(ErrorCode::NumericalOverflowError)?).ok_or(ErrorCode::NumericalOverflowError)?;

    let is_native = house.mint.key() == spl_token::native_mint::id();


    let data = recent_blockhashes.data.borrow();
    let most_recent = array_ref![data, 8, 8];
    let index3 = u64::from_le_bytes(*most_recent);
    let clock = clock::Clock::get().unwrap().unix_timestamp as u8;
    let clock_arr: [u8; 1] = [clock];
    let index = calculate_hash(&HashOfHash {
        recent_blockhash: index3,
        user: user_head.to_bytes(),
        clock: clock_arr
    });
    msg!(&index.to_string());
    puppet.data = index;
    if is_native {
        // SOL
        assert_keys_equal(ctx.accounts.payment_account.key(), ctx.accounts.user.key())?;
        invoke(
            &system_instruction::transfer(
                &ctx.accounts.user.key(),
                &ctx.accounts.operator_fee_account.key(),
                fee1),
            &[
                ctx.accounts.user.to_account_info().clone(),
                ctx.accounts.operator_fee_account.to_account_info().clone(),
                ctx.accounts.system_program.to_account_info().clone(),
            ],
        )?;
        invoke(
            &system_instruction::transfer(
                &ctx.accounts.user.key(),
                &ctx.accounts.author_fee_account.key(),
                fee2),
            &[
                ctx.accounts.user.to_account_info().clone(),
                ctx.accounts.author_fee_account.to_account_info().clone(),
                ctx.accounts.system_program.to_account_info().clone(),
            ],
        )?;
        invoke(
            &system_instruction::transfer(&ctx.accounts.user.key(),
                                          &ctx.accounts.operator_treasury.key(),
                                          bet),
            &[
                ctx.accounts.user.to_account_info().clone(),
                ctx.accounts.operator_treasury.to_account_info().clone(),
                ctx.accounts.system_program.to_account_info().clone(),
            ],
        )?;
    } else {
        // TOKEN
        assert_is_ata(&ctx.accounts.payment_account, &ctx.accounts.user.key(), &house.mint.key())?;
        invoke(
            &spl_token::instruction::transfer(
                &ctx.accounts.token_program.key,
                &ctx.accounts.payment_account.key(),
                &ctx.accounts.operator_fee_account.key(),
                &ctx.accounts.user.key(),
                &[],
                fee1)?,
            &[
                ctx.accounts.payment_account.to_account_info().clone(),
                ctx.accounts.operator_fee_account.to_account_info().clone(),
                ctx.accounts.user.to_account_info().clone(),

                ctx.accounts.system_program.to_account_info().clone(),
                ctx.accounts.token_program.to_account_info().clone()
            ],
        )?;
        invoke(
            &spl_token::instruction::transfer(
                &ctx.accounts.token_program.key,
                &ctx.accounts.payment_account.key(),
                &ctx.accounts.author_fee_account.key(),
                &ctx.accounts.user.key(),
                &[],
                fee2)?,
            &[
                ctx.accounts.payment_account.to_account_info().clone(),
                ctx.accounts.author_fee_account.to_account_info().clone(),
                ctx.accounts.user.to_account_info().clone(),

                ctx.accounts.system_program.to_account_info().clone(),
                ctx.accounts.token_program.to_account_info().clone()
            ],
        )?;
        invoke(
            &spl_token::instruction::transfer(
                &ctx.accounts.token_program.key,
                &ctx.accounts.payment_account.key(),
                &ctx.accounts.operator_treasury.key(),
                &ctx.accounts.user.key(),
                &[],
                bet)?,
            &[
                ctx.accounts.payment_account.to_account_info().clone(),
                ctx.accounts.operator_treasury.to_account_info().clone(),
                ctx.accounts.user.to_account_info().clone(),
ctx.accounts.system_program.to_account_info().clone(),
                ctx.accounts.token_program.to_account_info().clone()
            ],
        )?;
    }

    puppet.bet = bet;
    puppet.mode = mode;
    puppet.headstruehighrolltrue = headstruehighrolltrue;
    puppet.number = number;
    Ok(())
}


#[derive(Accounts)]
#[instruction(bet: u64, mode: u8, headstruehighrolltrue: bool, number: u8, puppet_bump: u8)]
pub struct PullStrings<'info> {
    #[account(mut, seeds=[PREFIX.as_bytes(), &user.key().to_bytes(), &house.key().to_bytes(), &puppet.uuid.as_bytes()],  bump=puppet_bump)]
    pub puppet: Account<'info, Data>,
    pub user: Signer<'info>,
    payment_account: UncheckedAccount<'info>,
    #[account(address = sysvar::recent_blockhashes::id())]
    recent_blockhashes: AccountInfo<'info>,
    #[account(seeds=[PREFIX.as_bytes(), &house.author.to_bytes(), &house.operator.to_bytes()], bump=house.house_bump)]
    house: Account<'info, House>,
    #[account(mut, seeds=[PREFIX.as_bytes(), TREASURY.as_bytes(), &house.key().to_bytes(), &house.author.to_bytes(), &house.operator.to_bytes()], bump=house.operator_treasury_bump)]
    operator_treasury: AccountInfo<'info>,
    #[account(mut, seeds=[PREFIX.as_bytes(), FEES.as_bytes(), &house.key().to_bytes(), &house.author.to_bytes(), &house.operator.to_bytes()], bump=house.author_fee_bump)]
    author_fee_account: AccountInfo<'info>,
    #[account(mut, seeds=[PREFIX.as_bytes(), FEES.as_bytes(), &house.key().to_bytes(), &house.author.to_bytes(), &house.operator.to_bytes()], bump=house.operator_fee_bump)]
    operator_fee_account: AccountInfo<'info>,
    token_program: Program<'info, Token>,
    system_program: Program<'info, System>,
}
