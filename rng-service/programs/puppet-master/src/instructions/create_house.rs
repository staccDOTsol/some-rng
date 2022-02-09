use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token};
use anchor_spl::associated_token::AssociatedToken;

use crate::errors::errorcodes::ErrorCode;
use crate::constants::sizes::HOUSE_SIZE;
use crate::constants::seeds::*;
use crate::structs::house::House;
use crate::utils::{create_program_token_account_if_not_present};

pub fn create_house<'info>(
    ctx: Context<CreateHouse>,
    house_bump: u8,
    author_fee_bump: u8,
    operator_treasury_bump: u8,
    operator_fee_bump: u8,
    fee_basis_points: u16,
) -> ProgramResult {
    if fee_basis_points > 10000 {
        return Err(ErrorCode::InvalidBasisPoints.into());
    }
    let payer = &ctx.accounts.author;
    let house = &mut ctx.accounts.house;

    house.house_bump = house_bump;
    house.author_fee_bump = author_fee_bump;
    house.operator_fee_bump = operator_fee_bump;
    house.operator_treasury_bump = operator_treasury_bump;
    house.mint = ctx.accounts.mint.key();
    house.author = ctx.accounts.author.key();
    house.operator = ctx.accounts.operator.key();
    house.author_fee_account = ctx.accounts.author_fee_account.key();
    house.author_fee_account_destination = ctx.accounts.author_fee_account_destination.key();
    house.operator_treasury = ctx.accounts.operator_treasury.key();
    house.operator_treasury_destination = ctx.accounts.operator_treasury_destination.key();
    house.operator_fee_account = ctx.accounts.operator_fee_account.key();
    house.operator_fee_destination = ctx.accounts.operator_fee_destination.key();
    house.fee_basis_points = fee_basis_points;

    let is_native = house.mint.key() == spl_token::native_mint::id();
    let house_key = house.key();

    let operator_treasury_seeds = [
        PREFIX.as_bytes(),
        TREASURY.as_bytes(),
        house_key.as_ref(),
        house.author.as_ref(),
        house.operator.as_ref(),
        &[operator_treasury_bump],
    ];

    msg!("Passes0");
    // ATA for operator treasury
    create_program_token_account_if_not_present(
        &ctx.accounts.operator_treasury,
        &ctx.accounts.system_program,
        &payer,
        &ctx.accounts.token_program,
        &ctx.accounts.mint,
        &house.to_account_info(),
        &ctx.accounts.rent,
        &operator_treasury_seeds,
        &[],
        is_native,
    )?;

    msg!("Passes1");
   /*
    if ctx.accounts.operator_treasury_destination.data_is_empty() {
        make_ata(
            ctx.accounts.operator_treasury_destination.to_account_info(),
            ctx.accounts.operator.to_account_info(),
            ctx.accounts.mint.to_account_info(),
            &payer,
            ctx.accounts.ata_program.to_account_info(),
            ctx.accounts.token_program.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
            ctx.accounts.rent.to_account_info(),
            &[],
        )?;
    }
    */
    msg!("Passes2");
    let operator_fee_account_seeds = [
        PREFIX.as_bytes(),
        FEES.as_bytes(),
        house_key.as_ref(),
        house.author.as_ref(),
        house.operator.as_ref(),
        &[operator_fee_bump],
    ];
    msg!("Passes3");
    // ATA for operator fee
    create_program_token_account_if_not_present(
        &ctx.accounts.operator_fee_account,
        &ctx.accounts.system_program,
        &payer,
        &ctx.accounts.token_program,
        &ctx.accounts.mint,
        &house.to_account_info(),
        &ctx.accounts.rent,
        &operator_fee_account_seeds,
        &[],
        is_native,
    )?;
    msg!("Passes3");
    /*
    if ctx.accounts.operator_fee_destination.data_is_empty() {
        make_ata(
            ctx.accounts.operator_fee_destination.to_account_info(),
            ctx.accounts.operator.to_account_info(),
           ctx.accounts.mint.to_account_info(),
            &payer,
            ctx.accounts.ata_program.to_account_info(),
            ctx.accounts.token_program.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
            ctx.accounts.rent.to_account_info(),
            &[],
        )?;
    }
    */
    msg!("Passes4");
    let author_fee_account_seeds = [
        PREFIX.as_bytes(),
        FEES.as_bytes(),
        house_key.as_ref(),
        house.author.as_ref(),
        house.operator.as_ref(),
        &[author_fee_bump],
    ];
    msg!("Passes5");
    // ATA for author fee
    create_program_token_account_if_not_present(
        &ctx.accounts.author_fee_account,
        &ctx.accounts.system_program,
        &payer,
        &ctx.accounts.token_program,
        &ctx.accounts.mint,
        &house.to_account_info(),
        &ctx.accounts.rent,
        &author_fee_account_seeds,
        &[],
        is_native,
    )?;
    msg!("Passes6");
    /*
    if ctx.accounts.author_fee_account_destination.data_is_empty() {
        make_ata(
            ctx.accounts.author_fee_account_destination.to_account_info(),
            ctx.accounts.author.to_account_info(),
            ctx.accounts.mint.to_account_info(),
            &payer,
            ctx.accounts.ata_program.to_account_info(),
            ctx.accounts.token_program.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
            ctx.accounts.rent.to_account_info(),
            &[],
        )?;
    }
*/
    Ok(())
}

#[derive(Accounts)]
#[instruction(house_bump: u8, author_fee_bump: u8, operator_treasury_bump: u8, operator_fee_bump: u8, fee_basis_points: u16)]
pub struct CreateHouse<'info> {
    // This mint address will be used for this house, fees/bets/etc. . It can also be wrapped_sol
    mint: Account<'info, Mint>,
    #[account(mut)]
    author: Signer<'info>,
    #[account(mut)]
    operator: AccountInfo<'info>,
    #[account(init, seeds=[PREFIX.as_bytes(), &author.key().to_bytes(), &operator.key.to_bytes()], bump=house_bump, space=HOUSE_SIZE, payer=author)]
    house: Account<'info, House>,
    #[account(mut, seeds=[PREFIX.as_bytes(), FEES.as_ref(), &house.key().to_bytes(), &author.key.to_bytes(), &operator.key.to_bytes()], bump=author_fee_bump)]
    author_fee_account: AccountInfo<'info>,
    #[account(mut)]
    author_fee_account_destination: AccountInfo<'info>,
    #[account(mut, seeds=[PREFIX.as_bytes(), TREASURY.as_bytes(), &house.key().to_bytes(), &author.key.to_bytes(), &operator.key.to_bytes()], bump=operator_treasury_bump)]
    operator_treasury: AccountInfo<'info>,
    #[account(mut)]
    operator_treasury_destination: AccountInfo<'info>,
    #[account(seeds=[PREFIX.as_bytes(), FEES.as_bytes(), &house.key().to_bytes(), &author.key.to_bytes(), &operator.key.to_bytes()], bump=operator_fee_bump)]
    operator_fee_account: AccountInfo<'info>,
    operator_fee_destination: AccountInfo<'info>,
    token_program: Program<'info, Token>,
    system_program: Program<'info, System>,
    ata_program: Program<'info, AssociatedToken>,
    rent: Sysvar<'info, Rent>,
}
