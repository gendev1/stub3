use crate::errors::Stub3Error;
use crate::state::{Market, RoyaltyRecipient};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct WithdrawRoyalties<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    #[account(
        mut,
        seeds = [b"royalty_recipient", market.key().as_ref(), royalty_recipient.recipient.key().as_ref()],
        bump,
        has_one = recipient
    )]
    pub royalty_recipient: Account<'info, RoyaltyRecipient>,
    #[account(mut)]
    pub recipient: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn withdraw_royalties(ctx: Context<WithdrawRoyalties>, amount: u64) -> Result<()> {
    let royalty_recipient = &mut ctx.accounts.royalty_recipient;
    let recipient = &mut ctx.accounts.recipient;

    if amount > royalty_recipient.accumulated_royalties {
        return Err(Stub3Error::InsufficientRoyalties.into());
    }

    royalty_recipient.accumulated_royalties = royalty_recipient
        .accumulated_royalties
        .checked_sub(amount)
        .ok_or(Stub3Error::NumericalOverflow)?;

    **royalty_recipient
        .to_account_info()
        .try_borrow_mut_lamports()? = royalty_recipient
        .to_account_info()
        .lamports()
        .checked_sub(amount)
        .ok_or(Stub3Error::NumericalOverflow)?;

    **recipient.to_account_info().try_borrow_mut_lamports()? = recipient
        .to_account_info()
        .lamports()
        .checked_add(amount)
        .ok_or(Stub3Error::NumericalOverflow)?;

    Ok(())
}
