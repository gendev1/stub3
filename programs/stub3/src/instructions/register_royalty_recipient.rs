use crate::state::{Market, RoyaltyRecipient};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct RegisterRoyaltyRecipient<'info> {
    #[account(mut, has_one = authority)]
    pub market: Account<'info, Market>,
    #[account(
        init,
        payer = authority,
        space = 8 + RoyaltyRecipient::LEN,
        seeds = [b"royalty_recipient", market.key().as_ref(), recipient.key().as_ref()],
        bump
    )]
    pub royalty_recipient: Account<'info, RoyaltyRecipient>,
    /// CHECK: This account is not read or written to, it's just used as a signer
    pub recipient: UncheckedAccount<'info>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn register_royalty_recipient(
    ctx: Context<RegisterRoyaltyRecipient>,
    recipient_type: u8,
    setlist_id: String,
) -> Result<()> {
    let royalty_recipient = &mut ctx.accounts.royalty_recipient;
    royalty_recipient.recipient = ctx.accounts.recipient.key();
    royalty_recipient.recipient_type = recipient_type;
    royalty_recipient.setlist_id = setlist_id;
    royalty_recipient.accumulated_royalties = 0;

    // TODO: Implement setlist verification logic
    // This would involve calling an external oracle or service to verify the setlist_id
    // For now, we'll assume the setlist_id is valid

    Ok(())
}
