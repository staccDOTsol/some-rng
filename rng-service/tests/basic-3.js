const {
  Keypair,
  SystemProgram,
  PublicKey,
  Connection
} = require('@solana/web3.js')

// GET THIS FROM RUNNING spl-token create, then spl-token create-account 9hrDuiqx5kNwezCDtVs1tBC85P9LxL4HbBtaMUxLf8hr
  

const {TOKEN_PROGRAM_ID, Token} = require( "@solana/spl-token" );

const HOUSE_PROGRAM_ID = new PublicKey("37cqo9JLTq26HyVPt6LcLkQ4pcFBm6vUAS2n7GtEvrAd");

const fs = require('fs')
const anchor = require("@project-serum/anchor");

async function loadHouseProgram(walletKeyPair) {
  const solConnection = new Connection("https://api.devnet.solana.com");
  const walletWrapper = new anchor.Wallet(walletKeyPair);
  const provider = new anchor.Provider(solConnection, walletWrapper, {
    preflightCommitment: 'confirmed', commitment: 'confirmed',
  });
  const idl = await anchor.Program.fetchIdl(
      HOUSE_PROGRAM_ID,
      provider,
  );

  // const idl = await anchor.Program.fetchIdl(HOUSE_PROGRAM_ID, provider);

  return new anchor.Program(idl, HOUSE_PROGRAM_ID, provider);
}

function loadWalletKey(keypair) {
  if (!keypair || keypair === '') {
    throw new Error('Keypair is required!');
  }
  return Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(keypair).toString())),
  );
}

let wins = 0;
const startts = new Date().getTime();
let losses = 0;
const operatorWalletJson = "./throwaway.json"

const operatorWalletKeyPair = loadWalletKey(operatorWalletJson);
const walletJson = "./throwaway.json"

const walletKeyPair = loadWalletKey(walletJson);
const walletWrapper = new anchor.Wallet(walletKeyPair);
const paymentAccount = walletKeyPair;
const solConnection = new anchor.web3.Connection(
    //@ts-ignore
    "https://api.devnet.solana.com",
);
const provider = new anchor.Provider(solConnection, walletWrapper, {
  preflightCommitment: 'confirmed', commitment: 'confirmed',
});
setTimeout(async function () {
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const puppetMaster = await loadHouseProgram(walletKeyPair);
  // const puppet = await loadPuppProgram(walletKeyPair);
  //Initialize a new puppet account.
  const house = new PublicKey("A1Aq3pwJCDg2BpqBWEepuewzAHB43B3y8sM48YyL5yWV")
  const operatorWalletJson = "./operator.json"

  const operatorWalletKeyPair = loadWalletKey(operatorWalletJson);
  const operator = operatorWalletKeyPair.publicKey
  const houseObj = await puppetMaster.account.house.fetch(
      house,
  );
  /*
  console.log(houseObj)
  const operator = houseObj.operator;
  const feetx = await puppetMaster.rpc.authorFeeWithdraw( new anchor.BN( 0.00001 * 10 ** 9 ), {
    accounts: {
      house,
      authorFeeAccount: houseObj.authorFeeAccount,
      authorFeeAccountDestination: houseObj.authorFeeAccountDestination,
      author: walletKeyPair.publicKey,
      systemProgram: SystemProgram.programId,
    },remainingAccounts: [
      {
        pubkey: houseObj.authorFeeAccount,
        isSigner: false,
        isWritable: true,
      }
    ],
    signers: [walletKeyPair],
  });
  console.log(feetx)
  */
  uuid = (Math.floor((Math.random() * 9)).toString() + Math.floor((Math.random() * 9)) + Math.floor((Math.random() * 9))
      + Math.floor((Math.random() * 9)) + Math.floor((Math.random() * 9)) + Math.floor((Math.random() * 9)))
  const [newPuppetAccount, newPuppetAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
      // @ts-ignore
      [Buffer.from("rng_house"), walletKeyPair.publicKey.toBuffer(), house.toBuffer(), Buffer.from(uuid)],
      HOUSE_PROGRAM_ID
  );
  console.log(newPuppetAccount.toBase58())
  console.log(newPuppetAccountBump)
  await puppetMaster.rpc.initialize(newPuppetAccountBump, uuid, {
    accounts: {
      puppet: newPuppetAccount,
      user: walletKeyPair.publicKey,
      systemProgram: SystemProgram.programId,
      recentBlockhashes: anchor.web3.SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
      house: house,
    },
    signers: [],
  });
  
  while (true) {//bet: u64, mode: u8, headstruehighrolltrue: bool, number: u8
    console.log(newPuppetAccount.toBase58())
    await puppetMaster.rpc.pullStrings(new anchor.BN(10 ** 4), new anchor.BN(0), true, new anchor.BN(0), newPuppetAccountBump, {
          accounts: {
            paymentAccount: paymentAccount.publicKey,
            authorFeeAccount: houseObj.authorFeeAccount,
            operatorFeeAccount: houseObj.operatorFeeAccount,
            house: house,
            puppet: newPuppetAccount,
            operatorTreasury: houseObj.operatorTreasury,
            recentBlockhashes: anchor.web3.SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
            user: walletKeyPair.publicKey,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID
          }, remainingAccounts: [
            {
              pubkey: houseObj.operatorTreasury,
              isSigner: false,
              isWritable: true,
            },
            {
              pubkey: walletKeyPair.publicKey,
              isSigner: true,
              isWritable: true,
            },/*
            {
              pubkey: paymentAccount.publicKey,
              isSigner: false,
              isWritable: true,
            },*/
            {
              pubkey: newPuppetAccount,
              isSigner: false,
              isWritable: true,
            }
          ],
          signers: [walletKeyPair],

        },
    );
    try {
      await puppetMaster.rpc.uncover({
            accounts: {

              paymentAccount: paymentAccount.publicKey,
              // @ts-ignore
              author: houseObj.author,
              // @ts-ignore
              operator: operator,
              // @ts-ignore
              authorFeeAccount: houseObj.authorFeeAccount,
              // @ts-ignore
              operatorFeeAccount: houseObj.operatorFeeAccount,
              house: house,
              puppet: newPuppetAccount,
              // @ts-ignore
              operatorTreasury: houseObj.operatorTreasury,
              recentBlockhashes: anchor.web3.SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
              user: walletKeyPair.publicKey,
              systemProgram: SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID
            }, remainingAccounts: [
              {
                pubkey: houseObj.operatorTreasury,
                isSigner: false,
                isWritable: true,
              },

              {
                pubkey: newPuppetAccount,
                isSigner: false,
                isWritable: true,
              }
            ],
            signers: [operatorWalletKeyPair],

          },
      );
      wins++;
    } catch (err) {
      losses++;
      console.log(err)
    }
    console.log((wins + losses).toString() + ' games played, ' + ((Math.round((wins / (wins + losses)) * 10000))
        / 100).toString() + '% winners! Test has been running: ' + ((new Date().getTime() - startts) / 1000 / 60
        / 60).toString() + ' hours :)')
    /*
      // Check the state updated.
      puppetAccount = await puppet.account.data.fetch(newPuppetAccount);
      if (puppetAccount.data < 4) {
        console.log(i)
        console.log(puppetAccount.data.toNumber())
        console.log('lost your bet of 0.01 sol')
        console.log('')
      } else {
        console.log(i)
        console.log(puppetAccount.data.toNumber())
        console.log('won 0.02 sol :)')
        console.log('')
      }
      */
  }

}, 1)
