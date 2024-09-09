use crate::state::Market;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializeMarket<'info> {
    #[account(init, payer = authority, space = 8 + std::mem::size_of::<Market>())]
    pub market: Account<'info, Market>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn initialize(ctx: Context<InitializeMarket>, royalty_percentage: u8) -> Result<()> {
    let market = &mut ctx.accounts.market;
    market.authority = ctx.accounts.authority.key();
    market.royalty_percentage = royalty_percentage;
    market.total_volume = 0;
    market.total_listings = 0;
    Ok(())
}
