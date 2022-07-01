import { AuctionHouse } from './AuctionHouse.mjs';
import { AccountNotFoundError } from '../../errors/SdkError.mjs';
import { parseAuctionHouseAccount } from '../../programs/auctionHouse/accounts/AuctionHouseAccount.mjs';
import { useOperation } from '../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindAuctionHouseByAddressOperation';
const findAuctionHouseByAddressOperation = useOperation(Key);
// -----------------
// Handler
// -----------------
const findAuctionHouseByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const unparsedAccount = await metaplex.rpc().getAccount(address, commitment);

    if (!unparsedAccount.exists) {
      throw new AccountNotFoundError(address, 'AuctionHouse');
    }

    const account = parseAuctionHouseAccount(unparsedAccount);
    return new AuctionHouse(account);
  }
};

export { findAuctionHouseByAddressOperation, findAuctionHouseByAddressOperationHandler };
//# sourceMappingURL=findAuctionHouseByAddress.mjs.map
