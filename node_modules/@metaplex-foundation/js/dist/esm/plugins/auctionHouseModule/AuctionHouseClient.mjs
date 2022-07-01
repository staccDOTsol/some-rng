import { AuctionHouseBuildersClient } from './AuctionHouseBuildersClient.mjs';
import { createAuctionHouseOperation } from './createAuctionHouse.mjs';
import { findAuctionHouseByAddressOperation } from './findAuctionHouseByAddress.mjs';
import { updateAuctionHouseOperation } from './updateAuctionHouse.mjs';
import { Task } from '../../utils/Task.mjs';
import { findAuctionHousePda } from '../../programs/auctionHouse/pdas/findAuctionHousePda.mjs';

class AuctionHouseClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  builders() {
    return new AuctionHouseBuildersClient(this.metaplex);
  }

  createAuctionHouse(input) {
    return new Task(async scope => {
      const output = await this.metaplex.operations().getTask(createAuctionHouseOperation(input)).run(scope);
      scope.throwIfCanceled();
      const auctionHouse = await this.findAuctionHouseByAddress(output.auctionHouse).run(scope);
      return { ...output,
        auctionHouse
      };
    });
  }

  updateAuctionHouse(auctionHouse, input) {
    return new Task(async scope => {
      const output = await this.metaplex.operations().getTask(updateAuctionHouseOperation({
        auctionHouse,
        ...input
      })).run(scope);
      scope.throwIfCanceled();
      const updatedAuctionHouse = await this.findAuctionHouseByAddress(auctionHouse.address).run(scope);
      return { ...output,
        auctionHouse: updatedAuctionHouse
      };
    });
  }

  findAuctionHouseByAddress(address, commitment) {
    return this.metaplex.operations().getTask(findAuctionHouseByAddressOperation({
      address,
      commitment
    }));
  }

  findAuctionHouseByCreatorAndMint(creator, treasuryMint, commitment) {
    return this.findAuctionHouseByAddress(findAuctionHousePda(creator, treasuryMint), commitment);
  }

}

export { AuctionHouseClient };
//# sourceMappingURL=AuctionHouseClient.mjs.map
