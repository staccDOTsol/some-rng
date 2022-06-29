// @ts-nocheck

import {Keypair, PublicKey, SystemProgram, TransactionInstruction, SYSVAR_RECENT_BLOCKHASHES_PUBKEY} from "@solana/web3.js";
import {getPlayerAccount, loadHouseProgram, loadWalletKey} from "./utils";
import {house} from "./constants";

// @ts-ignore
export const revealCoin = async (walletKeyPair: Keypair, player: PublicKey, jare: PublicKey, uuid: string): Promise<TransactionInstruction>  => {
  try{
  const [newPuppetAccount, newPuppetAccountBump] = await getPlayerAccount(player, house, uuid);
  console.log("newPuppetAccount ", newPuppetAccount.toBase58(), " newPuppetAccountBump ", newPuppetAccountBump);
  const puppetMaster = await loadHouseProgram(walletKeyPair);
  const houseObj = await puppetMaster.account.house.fetch(house);
  const wallie = loadWalletKey();
  return puppetMaster.instruction.uncover({
        accounts: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          author: houseObj.author,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          authorFeeAccount: houseObj.authorFeeAccount,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          operator: houseObj.operator,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          authorFeeAccount: houseObj.authorFeeAccount,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          operatorFeeAccount: houseObj.operatorFeeAccount,
          house: house,
          puppet: newPuppetAccount,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          operatorTreasury: houseObj.operatorTreasury,
          recentBlockhashes: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
          jare: jare,
          user: player,
          systemProgram: SystemProgram.programId,
        }, remainingAccounts: [
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            pubkey: houseObj.operatorTreasury,
            isSigner: false,
            isWritable: true,
          },
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            pubkey: player,
            isSigner: false,
            isWritable: true,
          }
        ],
        signers: [wallie],
      },
  );
    }
    catch(err){
      console.log(err);
    }
}
