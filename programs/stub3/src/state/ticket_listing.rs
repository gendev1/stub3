use anchor_lang::prelude::*;

#[account]
pub struct TicketListing {
    pub seller: Pubkey,
    pub nft_mint: Pubkey,
    pub price: u64,
    pub is_active: bool,
}

impl TicketListing {
    pub const LEN: usize = 32 + 32 + 8 + 1;
}