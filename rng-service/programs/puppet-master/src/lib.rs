use anchor_lang::prelude::*;

mod utils;
mod errors;
mod constants;
mod structs;
mod instructions;
mod games;

use instructions::*;

declare_id!("37cqo9JLTq26HyVPt6LcLkQ4pcFBm6vUAS2n7GtEvrAd");

#[program]
mod puppet_master {
    use super::*;

    pub fn create_house<'info>(
        ctx: Context<CreateHouse>,
        house_bump: u8,
        author_fee_bump: u8,
        operator_treasury_bump: u8,
        operator_fee_bump: u8,
        fee_basis_points: u16,
    ) -> ProgramResult {
        instructions::create_house::create_house(ctx, house_bump, author_fee_bump, operator_treasury_bump, operator_fee_bump , fee_basis_points)
    }

    pub fn pull_strings(ctx: Context<PullStrings>, bet: u64, mode: u8, headstruehighrolltrue: bool, number: u8, puppet_bump: u8) -> ProgramResult {
        instructions::pull_strings::pull_strings(ctx, bet, mode, headstruehighrolltrue, number, puppet_bump)
    }

    pub fn uncover(ctx: Context<Uncover>) -> ProgramResult {
        instructions::uncover::uncover(ctx)
    }

    pub fn initialize(ctx: Context<Initialize>, puppet_bump: u8, uuid: String) -> ProgramResult {
        instructions::initialize::initialize(ctx, puppet_bump, uuid)
    }

    pub fn author_fee_withdraw(ctx: Context<AuthorFeeWithdraw>, sol: u64) -> ProgramResult {
        instructions::author_fee_withdraw::author_fee_withdraw(ctx, sol)
    }

    pub fn operator_fee_withdraw(ctx: Context<OperatorFeeWithdraw>, sol: u64) -> ProgramResult {
        instructions::operator_fee_withdraw::operator_fee_withdraw(ctx, sol)
    }

    pub fn operator_treasury_withdraw(ctx: Context<OperatorTreasuryWithdraw>, sol: u64) -> ProgramResult {
        instructions::operator_treasury_withdraw::operator_treasury_withdraw(ctx, sol)
    }
}
