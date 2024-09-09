use crate::state::{Market, RoyaltyRecipient};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct UpdateRoyaltyRecipient<'info> {
    #[account(mut, has_one = authority)]
    pub market: Account<'info, Market>,
    #[account(
        mut,
        seeds = [b"royalty_recipient", market.key().as_ref(), royalty_recipient.recipient.key().as_ref()],
        bump
    )]
    pub royalty_recipient: Account<'info, RoyaltyRecipient>,
    pub authority: Signer<'info>,
}

pub fn update_royalty_recipient(
    ctx: Context<UpdateRoyaltyRecipient>,
    new_recipient: Pubkey,
    new_setlist_id: Option<String>,
) -> Result<()> {
    let royalty_recipient = &mut ctx.accounts.royalty_recipient;
    royalty_recipient.recipient = new_recipient;

    if let Some(setlist_id) = new_setlist_id {
        // TODO: Implement setlist verification logic
        // This would involve calling an external oracle or service to verify the setlist_id
        // For now, we'll assume the setlist_id is valid
        royalty_recipient.setlist_id = setlist_id;
    }

    Ok(())
}
