use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;
pub mod utils;

use crate::instructions::*;
// use crate::errors::Stub3Error;

declare_id!("94ms6qcjSiE8sZG8mov63YHqEAxhiaS5jiKXUtoSKFWp");

#[program]
pub mod stub3_secondary_market {
    use super::*;

    pub fn initialize_market(ctx: Context<InitializeMarket>, royalty_percentage: u8) -> Result<()> {
        instructions::initialize_market::initialize(ctx, royalty_percentage)
    }

    pub fn register_royalty_recipient(
        ctx: Context<RegisterRoyaltyRecipient>,
        recipient_type: u8,
        setlist_id: String,
    ) -> Result<()> {
        instructions::register_royalty_recipient::register_royalty_recipient(
            ctx,
            recipient_type,
            setlist_id,
        )
    }

    pub fn update_royalty_recipient(
        ctx: Context<UpdateRoyaltyRecipient>,
        new_recipient: Pubkey,
        new_setlist_id: Option<String>,
    ) -> Result<()> {
        instructions::update_royalty_recipient::update_royalty_recipient(
            ctx,
            new_recipient,
            new_setlist_id,
        )
    }

    pub fn withdraw_royalties(ctx: Context<WithdrawRoyalties>, amount: u64) -> Result<()> {
        instructions::withdraw_royalties::withdraw_royalties(ctx, amount)
    }

    pub fn list_ticket(ctx: Context<ListTicket>, price: u64) -> Result<()> {
        instructions::list_ticket::list_ticket(ctx, price)
    }

    pub fn purchase_ticket(ctx: Context<PurchaseTicket>) -> Result<()> {
        instructions::purchase_ticket::purchase_ticket(ctx)
    }
}
