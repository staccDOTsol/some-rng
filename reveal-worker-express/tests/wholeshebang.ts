import {
    Account,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
  } from "@solana/web3.js";
  import { getMatchesProgram } from "../api/src/contract/matches";

  import fs from 'fs';
  import { NodeWallet } from "@project-serum/common"; //TODO remove this
  import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
  import { airdrop, LOCALHOST } from "@metaplex-foundation/amman";
  import BN from "bn.js";
import { TokenType } from "../api/src/state/matches";
import { getOracle } from "../api/src/utils/pda";
import { web3 } from "@project-serum/anchor";
     
  

let template = {
  "winOracle": null,
  "matchState": { "initialized": true },
  "winOracleCooldown": 0,
  "space": 300,
  "minimumAllowedEntryTime": null,
  "tokenEntryValidation": null,
  "authority": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
  "leaveAllowed": true,
  "joinAllowedDuringStart": false,
  "oracleState": {
    "seed": "",
    "authority": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
    "finalized": false,
    "tokenTransferRoot": null,
    "tokenTransfers": [
    
    ]
  },
  "tokensToJoin": [
    {
      "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
      "amount": 1000,
      "sourceType": 1,
      "index": 1,
      "validationProgram": "nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"
    }   
  ]
}
    setTimeout(async function(){
let mod = 0;
const connection = new Connection(LOCALHOST, "recent");
let kp: Keypair;
let seed: web3.PublicKey =  Keypair.generate().publicKey
let kp2: Keypair;

let someRandom: Keypair;
kp = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('../reveal-worker-express/id.json').toString())))//new Uint8Array(walletKey));
kp2 = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('../reveal-worker-express/idhydra.json').toString())))//new Uint8Array(walletKey));

let membershipMint: Token;
//kp = Keypair.generate();
await airdrop(connection, kp.publicKey, LAMPORTS_PER_SOL * 10);
await airdrop(connection, kp.publicKey, LAMPORTS_PER_SOL * 10);
await airdrop(connection, kp.publicKey, LAMPORTS_PER_SOL * 10);
await airdrop(connection, kp.publicKey, LAMPORTS_PER_SOL * 10);
await airdrop(connection, kp.publicKey, LAMPORTS_PER_SOL * 10);
await airdrop(connection, kp.publicKey, LAMPORTS_PER_SOL * 10);
await airdrop(connection, kp.publicKey, LAMPORTS_PER_SOL * 10);
await airdrop(connection, kp.publicKey, LAMPORTS_PER_SOL * 10);
await airdrop(connection, kp.publicKey, LAMPORTS_PER_SOL * 10);
await airdrop(connection, kp.publicKey, LAMPORTS_PER_SOL * 10);
//kp2 = Keypair.generate();
await airdrop(connection, kp2.publicKey, LAMPORTS_PER_SOL * 10);
someRandom = Keypair.generate();
await airdrop(connection, someRandom.publicKey, LAMPORTS_PER_SOL * 10);
var walletKeyPair = new Account(kp.secretKey)
var walletKeyPairhydra = new Account(kp2.secretKey)

//var walletKeyPairplaya = new Account(someRandom.secretKey)

const anchorWallet = new NodeWallet(walletKeyPair)

const anchorProgram = await getMatchesProgram(kp, 'devnet', connection);

const anchorWallethydra = new NodeWallet(walletKeyPairhydra)

const anchorProgram2 = await getMatchesProgram(kp2, 'devnet', connection);

//const anchorWalletPlaya = new NodeWallet(walletKeyPairplaya)

//const anchorProgramPlaya = await getMatchesProgram(someRandom, 'devnet', connection);

  let anArrayOfBullshit = [walletKeyPair,someRandom, walletKeyPairhydra];
  let anArrayOfBsATAs: any = []
  membershipMint = await Token.createMint(
    connection,
    walletKeyPair,
    walletKeyPair.publicKey,
    null,
    9,
    TOKEN_PROGRAM_ID
  );
  for (var blarg of anArrayOfBullshit){
    const tokenAcctMember =
      await membershipMint.createAssociatedTokenAccount(blarg.publicKey);
      anArrayOfBsATAs.push(tokenAcctMember)
    await membershipMint.mintTo(
      tokenAcctMember,
      walletKeyPair.publicKey,
      [],
      138 * 10 ** 5
    );
  } 
  try {
    let config = template
    config.oracleState.seed = seed.toBase58()
    console.log('a')
try {
    await anchorProgram.createOrUpdateOracle(walletKeyPair,{
      seed: config.oracleState.seed,
      authority: config.oracleState.authority
        ? new web3.PublicKey(config.oracleState.authority)
        : walletKeyPair.publicKey,
      tokenTransferRoot: config.oracleState.tokenTransferRoot,
      tokenTransfers: config.oracleState.tokenTransfers,
      space: config.space ? new BN(config.space) : new BN(150),
      finalized: config.oracleState.finalized,
    });
    console.log('b')
    await anchorProgram.createMatch(
      walletKeyPair,
      {
        winOracle: config.winOracle
          ? new web3.PublicKey(config.winOracle)
          : (
              await getOracle(
                new web3.PublicKey(config.oracleState.seed),

                config.oracleState.authority
                  ? new web3.PublicKey(config.oracleState.authority)
                  : walletKeyPair.publicKey
              )
            )[0],
        matchState: config.matchState || { draft: true },
        tokenEntryValidationRoot: null,
        tokenEntryValidation: config.tokenEntryValidation
          ? config.tokenEntryValidation
          : null,
        winOracleCooldown: new BN(config.winOracleCooldown || 0),
        authority: config.authority
          ? new web3.PublicKey(config.authority)
          : walletKeyPair.publicKey,
        space: config.space ? new BN(config.space) : new BN(150),
        leaveAllowed: config.leaveAllowed,
        joinAllowedDuringStart: config.joinAllowedDuringStart,
        minimumAllowedEntryTime: config.minimumAllowedEntryTime
          ? new BN(config.minimumAllowedEntryTime)
          : null,
      },
      {},
      config.oracleState
    );
  
} catch (err){
  if (err.toString().indexOf('already been processed') == -1){ 
  console.log(err)
  }
}
setTimeout(async function(){
  if (config.tokensToJoin[0].amount  <= 0.138 * 10 ** 5){
    console.log('gud')
   
  
  //  const candyMachines = await anchorProgram.program.account .candyMachine.all();
  //  const configPublicKeys = candyMachines.map(candyMachine => candyMachine.account.config);
  
  //let commitment;
  //let encoding;
  
  if (true) {
    if (true) {
      //commitment = 'recent';
    } else { /*
      commitment = configOrCommitment.commitment;
      //encoding = configOrCommitment.encoding;
  
      if (configOrCommitment.dataSlice) {
        extra.dataSlice = configOrCommitment.dataSlice;
      }
  
      if (configOrCommitment.filters) {
        extra.filters = configOrCommitment.filters;
      } */
    }
  }
  
  
  
  
    
  let index = 0
  const setup = config.tokensToJoin[index];
  
  console.log('c')
  try  {
   anchorProgram.joinMatch(
    new NodeWallet(walletKeyPair),
    {
      amount: new BN(setup.amount),
      tokenEntryValidation: null,
      tokenEntryValidationProof: null,
    },
    {
      tokenMint: new web3.PublicKey(setup.mint),
      sourceTokenAccount: null,
      tokenTransferAuthority: null,
      validationProgram: setup.validationProgram
        ? new web3.PublicKey(setup.validationProgram)
        : null,
    },
    {
      winOracle:  (
            await getOracle(
              new web3.PublicKey(config.oracleState.seed),
  new web3.PublicKey(config.oracleState.authority)
            )
          )[0],
      sourceType: setup.sourceType as TokenType,
      index:new BN(setup.index),
    }
  );
  
  
  console.log('d')
   anchorProgram2.joinMatch(new NodeWallet(walletKeyPairhydra),
    {
      amount: new BN(setup.amount),
      tokenEntryValidation: null,
      tokenEntryValidationProof: null,
    },
    {
      tokenMint: new web3.PublicKey(setup.mint),
      sourceTokenAccount: null,
      tokenTransferAuthority: null,
      validationProgram: setup.validationProgram
        ? new web3.PublicKey(setup.validationProgram)
        : null,
    },
    {
      winOracle:  (
            await getOracle(
              new web3.PublicKey(config.oracleState.seed),
  new web3.PublicKey(config.oracleState.authority)
            )
          )[0],
      sourceType: setup.sourceType as TokenType,
      index:new BN(setup.index),
    }
  );
  
  }
  catch (err){
    console.log(err)
    //lols.slice(//lols.indexOf(someRandom.publicKey.toBase58() as string), 1)
  
    //fs.unlinkSync('./notpending/' + someRandom.publicKey.toBase58()) 
  }
  console.log('bla')
  setInterval(async function(){
    try {
    const winOracle =  (
      await getOracle(
        new web3.PublicKey(config.oracleState.seed),
    
        config.oracleState.authority
          ? new web3.PublicKey(config.oracleState.authority)
          : walletKeyPair.publicKey
      )
    )[0];
    
    const matchInstance = await anchorProgram.fetchMatch(winOracle);
  const u = matchInstance.object;
  let randomAf = Math.random() > 0.5
  if ( u.tokenTypesAdded.toNumber() > 2 ){
    //if (!//lols.includes(someRandom.publicKey.toBase58() as string)){
      //lols.push(someRandom.publicKey.toBase58() as string)
            try {
            console.log(u)
      
  console.log(u)
  
  // @ts-ignore
  config.matchState = {"started": true}
  await anchorProgram.updateMatch(
    {
      matchState: config.matchState || { draft: true },
      tokenEntryValidationRoot: null,
      tokenEntryValidation: config.tokenEntryValidation
        ? config.tokenEntryValidation
        : null,
      winOracleCooldown: new BN(config.winOracleCooldown || 0),
      authority: config.authority
        ? new web3.PublicKey(config.authority)
        : walletKeyPair.publicKey,
      leaveAllowed: config.leaveAllowed,
      joinAllowedDuringStart: config.joinAllowedDuringStart,
      minimumAllowedEntryTime: config.minimumAllowedEntryTime
        ? new BN(config.minimumAllowedEntryTime)
        : null,
    },
    {
      winOracle: config.winOracle
        ? new web3.PublicKey(config.winOracle)
        : (
            await getOracle(
              new web3.PublicKey(config.oracleState.seed),
  
              config.oracleState.authority
                ? new web3.PublicKey(config.oracleState.authority)
                : walletKeyPair.publicKey
            )
          )[0],
    },
    {}
  );
  //zlet setup = config.tokensToJoin[0]
  
   randomAf = Math.random() > 0.5
  if (randomAf){
    console.log('winner winner chicken dinner')
  
     mod = 0;
  /*
    var connection = new Connection(rpcUrl,{confirmTransactionInitialTimeout: 600000})
  
    const metaplex = new Metaplex(connection);
    const nfts = await metaplex.nfts().findAllByCreator(new PublicKey("ArL4smDroZyLV2hFbv116QxxUaxiHXmQVXWKuHJpUVKN"));
    const myNfts = await metaplex.nfts().findAllByOwner(new PublicKey(req.body.player));
  
    
    for (var nft of nfts){
      for (var myNft of myNfts){
        if (nft == myNft){
          if (nft.updateAuthority.toBase58() == "JAReaQwjLJACN89gJ4vLkqSbvbpx9uAmh1AEQy3NkPKb"){
            console.log('cool lol')
            // this r chicken dinna :); 
            // @ts-ignore
            mod = (parseInt(nft.metadata.attributes[0].value as string) / 100 - 0.04)
          }
        }
      }
    
  }
  */
  
    // winner winner chicken dinner
    config.oracleState.tokenTransfers =  [{ // auth 0; hydra 102% ; 198% player
      // @ts-ignore
      "from": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
      // @ts-ignore
      "to": someRandom.publicKey.toBase58(),
      // @ts-ignore
      "tokenTransferType": { "normal": true },
      
      // @ts-ignore
      "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
      // @ts-ignore
      "amount": config.tokensToJoin[0].amount
    }  ,
    {
      // @ts-ignore
      "from": "JAReaQwjLJACN89gJ4vLkqSbvbpx9uAmh1AEQy3NkPKb",
      // @ts-ignore
      "to": "JAReaQwjLJACN89gJ4vLkqSbvbpx9uAmh1AEQy3NkPKb",
      // @ts-ignore
      "tokenTransferType": { "normal": true },
      // @ts-ignore
      
      "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
      // @ts-ignore
      "amount": config.tokensToJoin[0].amount 
    } 
    ]
    if (mod > 0){
       // @ts-ignore
      config.oracleState.tokenTransfers[1].amount = config.tokensToJoin[0].amount
  
       // @ts-ignore
      config.oracleState.tokenTransfers[2].amount = config.tokensToJoin[0].amount * 1-mod
      
    config.oracleState.tokenTransfers.push( 
      {
        // @ts-ignore
        "from": "JAReaQwjLJACN89gJ4vLkqSbvbpx9uAmh1AEQy3NkPKb",
        // @ts-ignore
        "to": req.body.player,
        // @ts-ignore
        "tokenTransferType": { "normal": true },
        // @ts-ignore
        
        "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
        // @ts-ignore
        "amount": config.tokensToJoin[0].amount * mod
      } )  
    }
    let hmblarg = 0
    for (var blarg of config.oracleState.tokenTransfers){
      if (blarg){
      // @ts-ignore
      console.log(blarg.amount)
      // @ts-ignore
      hmblarg += blarg.amount
      }
    }
    console.log(hmblarg)
    
  }
  else {
    // srry
    console.log('srry')
  
     mod = 0;
  
  /*
    var connection = new Connection(rpcUrl,{confirmTransactionInitialTimeout: 600000})
  
    const metaplex = new Metaplex(connection);
    const nfts = await metaplex.nfts().findAllByCreator(new PublicKey("ArL4smDroZyLV2hFbv116QxxUaxiHXmQVXWKuHJpUVKN"));
    const myNfts = await metaplex.nfts().findAllByOwner(new PublicKey(req.body.player));
    for (var nft of nfts){
      for (var myNft of myNfts){
        if (nft == myNft){
          if (nft.updateAuthority.toBase58() == "JAReaQwjLJACN89gJ4vLkqSbvbpx9uAmh1AEQy3NkPKb"){
            console.log('cool lol')
            // this r srry we lost; 
            // @ts-ignore
            mod = parseInt(nft.metadata.attributes[1].value as string) / 100
          }
        }
      }
    
  } */
  
    config.oracleState.tokenTransfers =  [
    
    {
      // @ts-ignore
      "from": "JAReaQwjLJACN89gJ4vLkqSbvbpx9uAmh1AEQy3NkPKb",
      // @ts-ignore
      "to": "JAReaQwjLJACN89gJ4vLkqSbvbpx9uAmh1AEQy3NkPKb",
      // @ts-ignore
      "tokenTransferType": { "normal": true },
      // @ts-ignore
      
      "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
      // @ts-ignore
      "amount": config.tokensToJoin[0].amount
    },
    {
      // @ts-ignore
      "from": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
      // @ts-ignore
      "to": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
      // @ts-ignore
      "tokenTransferType": { "normal": true },
      // @ts-ignore
      
      "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
      // @ts-ignore
      "amount": config.tokensToJoin[0].amount
    } 
    ]
  }
  var ttt = [] ;
  for (var bla of config.oracleState.tokenTransfers){
    if (bla != undefined){
      ttt.push(bla)
    }
  }
    await anchorProgram.createOrUpdateOracle(walletKeyPair,{
      seed: config.oracleState.seed,
      authority: config.oracleState.authority
        ? new web3.PublicKey(config.oracleState.authority)
        : walletKeyPair.publicKey,
      tokenTransferRoot: config.oracleState.tokenTransferRoot,
      tokenTransfers: config.oracleState.tokenTransfers,
      space: config.space ? new BN(config.space) : new BN(150),
      finalized: config.oracleState.finalized,
      });
        
      await anchorProgram.updateMatch(
      {
        matchState: config.matchState || { draft: true },
        tokenEntryValidationRoot: null,
        tokenEntryValidation: config.tokenEntryValidation
          ? config.tokenEntryValidation
          : null,
        winOracleCooldown: new BN(config.winOracleCooldown || 0),
        authority: config.authority
          ? new web3.PublicKey(config.authority)
          : walletKeyPair.publicKey,
        leaveAllowed: config.leaveAllowed,
        joinAllowedDuringStart: config.joinAllowedDuringStart,
        minimumAllowedEntryTime: config.minimumAllowedEntryTime
          ? new BN(config.minimumAllowedEntryTime)
          : null,
      },
      {
        winOracle: config.winOracle
          ? new web3.PublicKey(config.winOracle)
          : (
              await getOracle(
                new web3.PublicKey(config.oracleState.seed),
      
                config.oracleState.authority
                  ? new web3.PublicKey(config.oracleState.authority)
                  : walletKeyPair.publicKey
              )
            )[0],
      },
      {}
      );
  
   //   arggg = [config.oracleState.tokenTransfers[2]]
   for (var i = 0; i <= 4; i=i+2){
   let arggg = [config.oracleState.tokenTransfers[i], config.oracleState.tokenTransfers[i+1]]
  
    console.log(arggg)
    let hmblarg = 0
    for (var blarg of arggg){
      if (blarg){
      // @ts-ignore
      console.log(blarg.amount)
      // @ts-ignore
      hmblarg += blarg.amount
      }
    }
    console.log(hmblarg)
  
  
  console.log({
    seed: config.oracleState.seed,
    authority: config.oracleState.authority
      ? new web3.PublicKey(config.oracleState.authority)
      : walletKeyPair.publicKey,
    tokenTransferRoot: config.oracleState.tokenTransferRoot,
    tokenTransfers: arggg,
    space: config.space ? new BN(config.space) : new BN(150),
    finalized: config.oracleState.finalized,
    })
    var done = false; 
    while (!done){
      try {
  await anchorProgram.createOrUpdateOracle(walletKeyPair,{
  seed: config.oracleState.seed,
  authority: config.oracleState.authority
    ? new web3.PublicKey(config.oracleState.authority)
    : walletKeyPair.publicKey,
  tokenTransferRoot: config.oracleState.tokenTransferRoot,
  tokenTransfers: arggg,
  space: config.space ? new BN(config.space) : new BN(150),
  finalized: config.oracleState.finalized,
  });
    
  await anchorProgram.updateMatch(
  {
    matchState: config.matchState || { draft: true },
    tokenEntryValidationRoot: null,
    tokenEntryValidation: config.tokenEntryValidation
      ? config.tokenEntryValidation
      : null,
    winOracleCooldown: new BN(config.winOracleCooldown || 0),
    authority: config.authority
      ? new web3.PublicKey(config.authority)
      : walletKeyPair.publicKey,
    leaveAllowed: config.leaveAllowed,
    joinAllowedDuringStart: config.joinAllowedDuringStart,
    minimumAllowedEntryTime: config.minimumAllowedEntryTime
      ? new BN(config.minimumAllowedEntryTime)
      : null,
  },
  {
    winOracle: config.winOracle
      ? new web3.PublicKey(config.winOracle)
      : (
          await getOracle(
            new web3.PublicKey(config.oracleState.seed),
  
            config.oracleState.authority
              ? new web3.PublicKey(config.oracleState.authority)
              : walletKeyPair.publicKey
          )
        )[0],
  },
  {}
  );
  done = true 
      }
      catch (err){
        console.log(err)
      }
    }
  console.log(3)
  for (var ablarg in arggg ){
  const tfer = arggg[ablarg];
  console.log(tfer)
  const winOracle =  (
    await getOracle(
      new web3.PublicKey(config.oracleState.seed),
  
      config.oracleState.authority
        ? new web3.PublicKey(config.oracleState.authority)
        : walletKeyPair.publicKey
    )
  )[0];
  console.log(5)
  setTimeout(async function(){
  console.log(6)
  
  if (tfer){
  // @ts-ignore
  if (tfer.from == anchorWallethydra.publicKey.toBase58()){
     var aha =  await anchorProgram2.disburseTokensByOracle(
      anchorWallethydra,
        {
          tokenDeltaProofInfo: null,
        },
        {
          winOracle,
        },
        {
          tokenDelta: tfer,
        }
      );
  
  
     
      ////let connection = new Connection(rpcUrl, {commitment: "recent", confirmTransactionInitialTimeout: 360000})
  
  var transaction = new web3.Transaction().add(...aha.instructions)
      transaction.feePayer = walletKeyPairhydra.publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
       await transaction.sign(walletKeyPairhydra)
       
      var transactionSignature = await connection.sendRawTransaction(
        transaction.serialize(),
        { skipPreflight: true }
      );
      console.log(transactionSignature)
  }
  if (tfer){
  // @ts-ignore
  if (tfer.from == anchorWallet.publicKey.toBase58()){
  
      var aha =  await anchorProgram.disburseTokensByOracle(
        anchorWallet,
          {
            tokenDeltaProofInfo: null,
          },
          {
            winOracle,
          },
          {
            tokenDelta: tfer,
          }
        );
    
       
        ////let connection = new Connection(rpcUrl, {commitment: "recent", confirmTransactionInitialTimeout: 360000})
    
    var transaction = new web3.Transaction().add(...aha.instructions)
        transaction.feePayer = walletKeyPair.publicKey
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
         await transaction.sign(walletKeyPair)
         
        var transactionSignature = await connection.sendRawTransaction(
          transaction.serialize(),
          { skipPreflight: true }
        );
        console.log(transactionSignature)
  }
  }
  }
  }, 10000)
  }
  }
  console.log(1)
  config.oracleState.finalized = true// = {"started": true}
  
  await anchorProgram.createOrUpdateOracle(walletKeyPair,{
    seed: config.oracleState.seed,
    authority: config.oracleState.authority
      ? new web3.PublicKey(config.oracleState.authority)
      : walletKeyPair.publicKey,
    tokenTransferRoot: config.oracleState.tokenTransferRoot,
    tokenTransfers: config.oracleState.tokenTransfers,
    space: config.space ? new BN(config.space) : new BN(150),
    finalized: config.oracleState.finalized,
  });
  done = true 
      
    try {
  console.log(2)
  await anchorProgram.updateMatchFromOracle(
    {},
    {
      winOracle: config.winOracle
        ? new web3.PublicKey(config.winOracle)
        : (
            await getOracle(
              new web3.PublicKey(config.oracleState.seed),
  
              config.oracleState.authority
                ? new web3.PublicKey(config.oracleState.authority)
                : walletKeyPair.publicKey
            )
          )[0],
    },
    {}
  );
  }
  catch (err){
   console.log(err)
  
  }
  
  try {
  // @ts-ignore
  config.matchState = {"finalized": true}
  await anchorProgram.updateMatch(
    {
      matchState: config.matchState || { draft: true },
      tokenEntryValidationRoot: null,
      tokenEntryValidation: config.tokenEntryValidation
        ? config.tokenEntryValidation
        : null,
      winOracleCooldown: new BN(config.winOracleCooldown || 0),
      authority: config.authority
        ? new web3.PublicKey(config.authority)
        : walletKeyPair.publicKey,
      leaveAllowed: config.leaveAllowed,
      joinAllowedDuringStart: config.joinAllowedDuringStart,
      minimumAllowedEntryTime: config.minimumAllowedEntryTime
        ? new BN(config.minimumAllowedEntryTime)
        : null,
    },
    {
      winOracle: config.winOracle
        ? new web3.PublicKey(config.winOracle)
        : (
            await getOracle(
              new web3.PublicKey(config.oracleState.seed),
  
              config.oracleState.authority
                ? new web3.PublicKey(config.oracleState.authority)
                : walletKeyPair.publicKey
            )
          )[0],
    },
    {}
  );
  }
   catch (err){
    console.log(err)
  
   }
  
  if (randomAf){
  
  config.oracleState.tokenTransfers =  [
    {
      // @ts-ignore
      "from": someRandom.publicKey.toBase58(),
      // @ts-ignore
      "to": someRandom.publicKey.toBase58(),
      // @ts-ignore
      "tokenTransferType": { "normal": true },
      // @ts-ignore
      
      "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
      // @ts-ignore
      "amount": config.tokensToJoin[0].amount * 0.96
    }  ,
  
    {
      // @ts-ignore
      "from": someRandom.publicKey.toBase58(),
      // @ts-ignore
      "to": "JAReaQwjLJACN89gJ4vLkqSbvbpx9uAmh1AEQy3NkPKb",
      // @ts-ignore
      "tokenTransferType": { "normal": true },
      // @ts-ignore
      
      "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
      // @ts-ignore
      "amount": config.tokensToJoin[0].amount / 100 * 4
    }]
  
    if (mod > 0){
      // @ts-ignore
     config.oracleState.tokenTransfers[1].amount = config.tokensToJoin[0].amount
  
      // @ts-ignore
     config.oracleState.tokenTransfers[2].amount = config.tokensToJoin[0].amount * 1-mod
     
   config.oracleState.tokenTransfers.push( 
     {
       // @ts-ignore
       "from": "JAReaQwjLJACN89gJ4vLkqSbvbpx9uAmh1AEQy3NkPKb",
       // @ts-ignore
       "to": req.body.player,
       // @ts-ignore
       "tokenTransferType": { "normal": true },
       // @ts-ignore
       
       "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
       // @ts-ignore
       "amount": config.tokensToJoin[0].amount * mod
     } )  
   }
  } else {
    config.oracleState.tokenTransfers = [{ // authority 198`%; player 0%; 102% h
      // @ts-ignore
      "from": someRandom.publicKey.toBase58(),
      // @ts-ignore
      "to": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
      // @ts-ignore
      "tokenTransferType": { "normal": true },
      // @ts-ignore
      
      "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
      // @ts-ignore
      "amount": Math.floor((config.tokensToJoin[0].amount * 0.96))
    },
    {
      // @ts-ignore
      "from": someRandom.publicKey.toBase58(),
      // @ts-ignore
      "to": "JAReaQwjLJACN89gJ4vLkqSbvbpx9uAmh1AEQy3NkPKb",
      // @ts-ignore
      "tokenTransferType": { "normal": true },
      // @ts-ignore
      
      "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
      // @ts-ignore
      "amount": config.tokensToJoin[0].amount * 0.04
    } ]
    if (mod > 0){
      config.oracleState.tokenTransfers[0] = 
      { // authority 198`%; player 0%; 102% h
        // @ts-ignore
        "from": someRandom.publicKey.toBase58(),
        // @ts-ignore
        "to": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
        // @ts-ignore
        "tokenTransferType": { "normal": true },
        // @ts-ignore
        
        "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
        // @ts-ignore
        "amount": Math.floor((config.tokensToJoin[0].amount * 0.96) * 1-mod)
      }
      config.oracleState.tokenTransfers.push(
        { // authority 198`%; player 0%; 102% h
          // @ts-ignore
          "from": someRandom.publicKey.toBase58(),
          // @ts-ignore
          "to": someRandom.publicKey.toBase58(),
          // @ts-ignore
          "tokenTransferType": { "normal": true },
          // @ts-ignore
          
          "mint": "rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL",
          // @ts-ignore
          "amount": Math.floor((config.tokensToJoin[0].amount * 0.96) * mod)
        }
      )
    }
  }
  let index = 0
  
  const setup = config.tokensToJoin[index];
  
  setTimeout(async function(){
    try {
    // @ts-ignore
    let winOracle =  await getOracle(
      new web3.PublicKey(config.oracleState.seed),
  
      config.oracleState.authority
        ? new web3.PublicKey(config.oracleState.authority)
        : walletKeyPairhydra.publicKey
    )
  
  console.log(7)
  setTimeout(async function(){
    try {
     var aha = await anchorProgram2.leaveMatch(
        new NodeWallet(walletKeyPairhydra),
        {
          amount: new BN(setup.amount * 1.02),
        },
        {
          tokenMint: new web3.PublicKey(setup.mint),
          receiver: walletKeyPairhydra.publicKey,
        },
        {
          winOracle: config.winOracle
            ? new web3.PublicKey(config.winOracle)
            : (
                await getOracle(
                  new web3.PublicKey(config.oracleState.seed),
  
                  config.oracleState.authority
                    ? new web3.PublicKey(config.oracleState.authority)
                    : walletKeyPair.publicKey
                )
              )[0],
        }
      );
  
  
  
     
      ////let connection = new Connection(rpcUrl, {commitment: "recent", confirmTransactionInitialTimeout: 360000})
  
  var transaction = new web3.Transaction().add(...aha.instructions)
      transaction.feePayer = walletKeyPairhydra.publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
       await transaction.sign(walletKeyPairhydra)
       
      const transactionSignature = await connection.sendRawTransaction(
        transaction.serialize(),
        { skipPreflight: true }
      );
      console.log(transactionSignature)
    } catch (err){
      console.log(err)
    }
      let amount
  
      if (randomAf){
  
        amount = new BN(0)
      }
      else {
        amount = new BN(setup.amount*1.96)
      }
      
  var aha =  await anchorProgram.leaveMatch(
      new NodeWallet(walletKeyPair),
       {
         amount: amount,
       },
       {
         tokenMint: new web3.PublicKey(setup.mint),
         receiver: walletKeyPairhydra.publicKey,
       },
       {
         winOracle: winOracle[0]
       }
     );
  
  
     ////let connection = new Connection(rpcUrl, { commitment: "recent", confirmTransactionInitialTimeout: 360000})
  
     var transaction = new web3.Transaction().add(...aha.instructions)
         transaction.feePayer = walletKeyPair.publicKey
         transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
          await transaction.sign(walletKeyPair)
          
         const transactionSignature2 = await connection.sendRawTransaction(
           transaction.serialize(),
           { skipPreflight: true }
         );
         console.log(transactionSignature2)
         }, 120 * 1000)
         /*
     let tokenAmount = await connection.getTokenAccountBalance(new PublicKey("Hdocsu5XxuZA8ruobNgB6Mi6GvXscLzMCtjr4j17cLrF"));
  
      var transaction = new web3.Transaction().add(
        Token.createApproveInstruction(
            TOKEN_PROGRAM_ID,
            new PublicKey("Hdocsu5XxuZA8ruobNgB6Mi6GvXscLzMCtjr4j17cLrF"), // from (should be a token account)
  
            new PublicKey("AvzcGEMLJMt1USm4tWWSYAQYhGVBJPTKYEGnnuD6uA2M"), // to (should be a token account)
            walletKeyPairhydra.publicKey,
            [],
            parseInt(tokenAmount.value.amount)*138))
            
        createTransferCheckedInstruction(
          new PublicKey("Hdocsu5XxuZA8ruobNgB6Mi6GvXscLzMCtjr4j17cLrF"), // from (should be a token account)
          new PublicKey("rainH85N1vCoerCi4cQ3w6mCf7oYUdrsTFtFzpaRwjL"), // mint
          new PublicKey("AvzcGEMLJMt1USm4tWWSYAQYhGVBJPTKYEGnnuD6uA2M"), // to (should be a token account)
          walletKeyPairhydra.publicKey, // from's owner
          tokenAmount.value.uiAmount as number / 100 * 99, // amount, if your deciamls is 8, send 10^8 for 1 token
          tokenAmount.value.decimals // decimals
        )
      );
     
  
      transaction.feePayer = walletKeyPairhydra.publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
       await transaction.sign(walletKeyPairhydra)
       
      const transactionSignature = await connection.sendRawTransaction(
        transaction.serialize(),
        { skipPreflight: true }
      );
      
      console.log('shit shit shit fire ze missiles.. or rather not? that ' + transactionSignature)
      */
  
  
    } catch (err){
      console.log(err)
    }
     //
    }, 2500)
    }
  
     catch (err){
      console.log(err)
      //lols.slice(//lols.indexOf(someRandom.publicKey.toBase58() as string), 1)
    }
  }
  try {
    if (Object.keys(u.state)[0] != 'initialized'){
      //if (!//lols.includes(someRandom.publicKey.toBase58() as string)){
  /*
  await anchorProgram.drainMatch(
    new NodeWallet(walletKeyPair),
  {},
  {
    receiver: walletKeyPair.publicKey,
  },
  {
    winOracle: config.winOracle
      ? new web3.PublicKey(config.winOracle)
      : (
          await getOracle(
            new web3.PublicKey(config.oracleState.seed),
  
            config.oracleState.authority
              ? new web3.PublicKey(config.oracleState.authority)
              : walletKeyPair.publicKey
          )
        )[0],
  }
  );
  await anchorProgram.drainOracle(
    new NodeWallet(walletKeyPair),
  {
    seed: config.oracleState.seed,
    authority: config.oracleState.authority
      ? new web3.PublicKey(config.oracleState.authority)
      : walletKeyPair.publicKey,
  },
  {
    receiver: walletKeyPair.publicKey,
  }
  ); */
      }
  try {
    //lols.slice(//lols.indexOf(someRandom.publicKey.toBase58() as string), 1)
  
  //fs.unlinkSync('./notpending/' + someRandom.publicKey.toBase58()) 
  }
  catch (err){
  //lols.slice(//lols.indexOf(someRandom.publicKey.toBase58() as string), 1)
  //fs.unlinkSync('./notpending/' + someRandom.publicKey.toBase58()) 
  console.log(err)
  }
    }
    catch (err){
      console.log(err)
    }
  }catch(err){
    console.log(err)
  }
  })
} }, 5000)
    }catch (err){
  console.log(err)
    }
  },1)