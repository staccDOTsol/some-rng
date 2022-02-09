use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke_signed;
use anchor_lang::solana_program::system_instruction;

pub fn transfer_sol(from: &Pubkey, to: &Pubkey, amount: u64, account_infos: &[AccountInfo], signers_seeds: Option<&[&[&[u8]]]>) -> ProgramResult {
    let signers = signers_seeds.unwrap_or(&[]);

    invoke_signed(
        &system_instruction::transfer(from, to, amount),
        account_infos,
        signers,
    )
}


pub fn transfer_token(program_id: &Pubkey, from: &Pubkey, to: &Pubkey, authority: &Pubkey, amount: u64, account_infos: &[AccountInfo], signers_seeds: Option<&[&[&[u8]]]>) -> ProgramResult {
    let signers = signers_seeds.unwrap_or(&[]);

    invoke_signed(
        &spl_token::instruction::transfer(
            program_id,
            from,
            to,
            authority,
            &[],
            amount,
        )?,
        account_infos,
        signers
    )
}
