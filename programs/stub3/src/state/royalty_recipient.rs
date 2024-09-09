use anchor_lang::prelude::*;

#[account]
pub struct RoyaltyRecipient {
    pub recipient: Pubkey,
    pub recipient_type: u8, // 0 = Band, 1 = Songwriter, 2 = Promoter
    pub setlist_id: String,
    pub accumulated_royalties: u64,
}

impl RoyaltyRecipient {
    pub const LEN: usize = 32 + 1 + 64 + 8; // Assuming max setlist_id length of 64
}