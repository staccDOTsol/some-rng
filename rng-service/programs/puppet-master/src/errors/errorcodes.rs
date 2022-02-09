use anchor_lang::error;
#[error]
pub enum ErrorCode {
    #[msg("Not enough SOL to pay for this minting")]
    NotEnoughSOL,
    #[msg("Something is odd about your choices here... try again!")]
    BadChoices,
    #[msg("Numerical overflow error!")]
    NumericalOverflowError,
    #[msg("Unable to find an unused config line near your random number index")]
    CannotFindUsableConfigLine,
    #[msg("BP must be less than or equal to 10000")]
    InvalidBasisPoints,
    #[msg("PublicKeyMismatch")]
    PublicKeyMismatch,
    #[msg("UninitializedAccount")]
    UninitializedAccount,
    #[msg("IncorrectOwner")]
    IncorrectOwner,
    #[msg("YouLost")]
    Lost,
    #[msg("Index goes boom")]
    IndexBoom,
    #[msg("House already created")]
    HouseAlreadyCreated
}
