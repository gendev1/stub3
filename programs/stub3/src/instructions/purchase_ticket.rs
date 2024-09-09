use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, Mint, TokenAccount, Transfer};
use anchor_spl::associated_token::AssociatedToken;
use crate::state::{Market, TicketListing};
use crate::errors::Stub3Error;

#[derive(Accounts)]
pub struct PurchaseTicket<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    #[account(
        mut,
        seeds = [b"ticket_listing", market.key().as_ref(), nft_mint.key().as_ref()],
        bump,
        constraint = ticket_listing.is_active @ ProgramError::InvalidAccountData
    )]
    pub ticket_listing: Account<'info, TicketListing>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    /// CHECK: We're paying into this account
    #[account(mut)]
    pub seller: UncheckedAccount<'info>,
    pub nft_mint: Account<'info, Mint>,
    #[account(
        mut,
        constraint = seller_token_account.mint == nft_mint.key(),
        constraint = seller_token_account.owner == seller.key()
    )]
    pub seller_token_account: Account<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = nft_mint,
        associated_token::authority = buyer
    )]
    pub buyer_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn purchase_ticket(ctx: Context<PurchaseTicket>) -> Result<()> {
    let ticket_listing = &mut ctx.accounts.ticket_listing;
    let market = &mut ctx.accounts.market;
    let buyer = &ctx.accounts.buyer;
    let seller = &ctx.accounts.seller;

    // Transfer payment from buyer to seller
    let price = ticket_listing.price;
    let royalty_amount = (price as u128)
        .checked_mul(market.royalty_percentage as u128)
        .ok_or(Stub3Error::NumericalOverflow)?
        .checked_div(100)
        .ok_or(Stub3Error::NumericalOverflow)? as u64;

    let seller_amount = price.checked_sub(royalty_amount)
        .ok_or(Stub3Error::NumericalOverflow)?;

    // Transfer payment to seller
    anchor_lang::solana_program::program::invoke(
        &anchor_lang::solana_program::system_instruction::transfer(
            &buyer.key(),
            &seller.key(),
            seller_amount,
        ),
        &[
            buyer.to_account_info(),
            seller.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
    )?;

    // Transfer NFT from seller to buyer
    let cpi_accounts = Transfer {
        from: ctx.accounts.seller_token_account.to_account_info(),
        to: ctx.accounts.buyer_token_account.to_account_info(),
        authority: seller.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, 1)?;

    // Update market stats
    market.total_volume = market.total_volume.checked_add(price)
        .ok_or(Stub3Error::NumericalOverflow)?;
    market.total_listings = market.total_listings.checked_sub(1)
        .ok_or(Stub3Error::NumericalOverflow)?;

    // Close the listing
    ticket_listing.is_active = false;

    Ok(())
}