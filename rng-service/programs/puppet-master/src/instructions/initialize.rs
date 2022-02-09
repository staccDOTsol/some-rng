use anchor_lang::prelude::*;
use anchor_lang::solana_program::sysvar;

use crate::structs::*;
use crate::constants::*;

pub fn initialize(ctx: Context<Initialize>, puppet_bump: u8, uuid: String) -> ProgramResult {
    let puppet = &mut ctx.accounts.puppet;
    puppet.user = ctx.accounts.user.key();
    puppet.puppet_bump = puppet_bump;
    puppet.uuid = uuid;
    Ok(())
}

#[derive(Accounts)]
#[instruction(puppet_bump: u8, uuid: String)]
pub struct Initialize<'info> {
    // [Buffer.from("rng_house"), provider.wallet.publicKey.toBuffer(), houseObj.operator.toBuffer()]
    //init, seeds=[b"rng_house".as_ref(), &author.key().to_bytes(), &operator.key.to_bytes()], bump=house_bump, space=HOUSE_SIZE, payer=author)]
    #[account(init ,seeds=[b"rng_house".as_ref(), &user.key().to_bytes(), &house.key().to_bytes(), uuid.as_bytes()],  bump=puppet_bump, space=HOUSE_SIZE, payer=user)]
    pub puppet: Account<'info, Data>,
    pub user: Signer<'info>,

    #[account(address = sysvar::recent_blockhashes::id())]
    recent_blockhashes: AccountInfo<'info>,
    #[account(seeds=[b"rng_house".as_ref(), &house.author.to_bytes(), &house.operator.to_bytes()], bump=house.house_bump)]
    house: Account<'info, House>,
    pub system_program: Program<'info, System>,
}
