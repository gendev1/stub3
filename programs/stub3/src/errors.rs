use anchor_lang::prelude::*;

#[error_code]
pub enum Stub3Error {
    #[msg("Insufficient royalties to withdraw")]
    InsufficientRoyalties,

    #[msg("Numerical overflow occurred")]
    NumericalOverflow,

    #[msg("The listing is not active")]
    ListingNotActive,

    #[msg("Invalid NFT metadata")]
    InvalidNFTMetadata,

    #[msg("Unauthorized access")]
    Unauthorized,

    #[msg("Setlist verification failed")]
    SetlistVerificationFailed,

    #[msg("External service error")]
    ExternalServiceError,
}
