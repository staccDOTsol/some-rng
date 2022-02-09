use anchor_lang::prelude::*;
use anchor_spl::token::{TokenAccount};
use spl_token::state::Account;
use spl_associated_token_account::get_associated_token_address;
use anchor_lang::solana_program::program_pack::IsInitialized;
use anchor_lang::solana_program::program_pack::Pack;
use crate::errors::ErrorCode::{IncorrectOwner, PublicKeyMismatch, UninitializedAccount};

pub fn assert_is_ata(
    ata: &AccountInfo,
    wallet: &Pubkey,
    mint: &Pubkey,
) -> Result<Account, ProgramError> {
    assert_owned_by(ata, &spl_token::id())?;
    let ata_account: Account = assert_initialized(ata)?;
    assert_keys_equal(ata_account.owner, *wallet)?;
    assert_keys_equal(get_associated_token_address(wallet, mint), *ata.key)?;
    Ok(ata_account)
}

pub fn assert_owned_by(account: &AccountInfo, owner: &Pubkey) -> ProgramResult {
    if account.owner != owner {
        Err(IncorrectOwner.into())
    } else {
        Ok(())
    }
}

pub fn assert_initialized<T: Pack + IsInitialized>(
    account_info: &AccountInfo,
) -> Result<T, ProgramError> {
    let account: T = T::unpack_unchecked(&account_info.data.borrow())?;
    if !account.is_initialized() {
        Err(UninitializedAccount.into())
    } else {
        Ok(account)
    }
}

pub fn assert_keys_equal(key1: Pubkey, key2: Pubkey) -> ProgramResult {
    if key1 != key2 {
        Err(PublicKeyMismatch.into())
    } else {
        Ok(())
    }
}
