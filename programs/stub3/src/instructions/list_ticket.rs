use crate::state::{Market, TicketListing};
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct ListTicket<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    #[account(
        init,
        payer = seller,
        space = 8 + TicketListing::LEN,
        seeds = [b"ticket_listing", market.key().as_ref(), nft_mint.key().as_ref()],
        bump
    )]
    pub ticket_listing: Account<'info, TicketListing>,
    pub nft_mint: Account<'info, Mint>,
    #[account(
        constraint = nft_token_account.mint == nft_mint.key(),
        constraint = nft_token_account.owner == seller.key()
    )]
    pub nft_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub seller: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn list_ticket(ctx: Context<ListTicket>, price: u64) -> Result<()> {
    let ticket_listing = &mut ctx.accounts.ticket_listing;
    let market = &mut ctx.accounts.market;

    ticket_listing.seller = ctx.accounts.seller.key();
    ticket_listing.nft_mint = ctx.accounts.nft_mint.key();
    ticket_listing.price = price;
    ticket_listing.is_active = true;

    market.total_listings = market
        .total_listings
        .checked_add(1)
        .ok_or(ProgramError::ArithmeticOverflow)?;

    Ok(())
}
