use anchor_lang::prelude::*;

#[account]
pub struct Market {
    pub authority: Pubkey,
    pub royalty_percentage: u8,
    pub total_volume: u64,
    pub total_listings: u64,
}

impl Market {
    pub const LEN: usize = 32 + 1 + 8 + 8;
}
