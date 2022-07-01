
import express, {Request, Response} from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {handleRequest} from "./coin-flip/handler";
import { Connection, Keypair } from "@solana/web3.js";
//import { Metaplex } from "@metaplex-foundation/js";




import fs from 'fs'
import { getMatchesProgram } from "./contract/matches";
import { BN, web3 } from "@project-serum/anchor";
import { getOracle } from "./utils/pda";
import { TokenType } from "./state/matches";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
var mod = 0
//import { PublicKey } from "@solana/web3.js";
var bodyParser = require('body-parser')
let env = 'devnet'
if (fs.existsSync(".env")) {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}
let twofiddy = 3

const app = express();
app.use(bodyParser())
app.use(cors());


app.get("/", (_: Request, res: Response) => {
  res.send({message: "Dont forget to tip https://twitter.com/STACCoverflow ; hey silly u are in the wrong place :) go to the one without the prepended  www. ha \n you are lookin for https://autist.design catch y'all on da flip"});
});


app.get("/api", (_: Request, res: Response) => {
  res.send({message: "api is connected"});
});

app.post("/derp",async (req: Request, res: Response) => {
  let ablarg = req.body.ablarg
  let connection = new Connection(rpcUrl, {commitment: "confirmed", confirmTransactionInitialTimeout: 360000})
  let awhoo = await connection.sendEncodedTransaction(ablarg)
  console.log(awhoo)
  res.send(200)
})
app.get("/join",async (req: Request, res: Response) => {
  try {
  let c = Math.floor(Math.random() * twofiddy)
  let c2 = 1
  let config = template
  fs.readdirSync('../reveal-worker-express/pending').forEach(file => {
    console.log(file)
    //console.log(file);
    if (c == c2){
      //fs.copyFileSync ('../reveal-worker-express/pending/' + file, '../reveal-worker-express/notpending/' + req.query.player)
      config = JSON.parse(fs.readFileSync('../reveal-worker-express/pending/' + file).toString())//req.query.player).toString())

      fs.unlinkSync('../reveal-worker-express/pending/' + file)
    
      config.tokensToJoin[0].amount = parseInt(req.query.risk as string)
      fs.writeFileSync('../reveal-worker-express/notpending/'+req.query.player, JSON.stringify(config))
   
    }
    c2++;
  });
if (config.tokensToJoin[0].amount  <= 0.138 * 10 ** 9){
  console.log('gud')
  const walletKeyPair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('../reveal-worker-express/id.json').toString())))//new Uint8Array(walletKey));
  const anchorWallet = new NodeWallet(walletKeyPair)
  console.log(`wallet public key:3 ${walletKeyPair.publicKey}`);
  console.log('joinnnnin')
  const anchorProgram = await getMatchesProgram(anchorWallet, env, rpcUrl);

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

const walletKeyPairhydra = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('../reveal-worker-express/idhydra.json').toString())))//new Uint8Array(walletKey));
  const anchorWallethydra = new NodeWallet(walletKeyPairhydra)
const anchorProgram2 = await getMatchesProgram(anchorWallethydra, env, rpcUrl);

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
  lols.slice(lols.indexOf(req.query.player as string), 1)

  //fs.unlinkSync('../reveal-worker-express/notpending/' + req.query.player) 
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
  if (!lols.includes(req.query.player as string)){
    lols.push(req.query.player as string)
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
    "to": req.query.player,
    // @ts-ignore
    "tokenTransferType": { "normal": true },
    
    // @ts-ignore
    "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
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
    
    "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
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
      
      "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
      // @ts-ignore
      "amount": config.tokensToJoin[0].amount * mod
    } )  
  }
  let hmblarg = 0
  for (var blarg of config.oracleState.tokenTransfers){
    // @ts-ignore
    console.log(blarg.amount)
    // @ts-ignore
    hmblarg += blarg.amount
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
    
    "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
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
    
    "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
    // @ts-ignore
    "amount": config.tokensToJoin[0].amount
  } 
  ]

  await anchorProgram.createOrUpdateOracle({
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
    // @ts-ignore
    console.log(blarg.amount)
    // @ts-ignore
    hmblarg += blarg.amount
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
await anchorProgram.createOrUpdateOracle({
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


   
    let connection = new Connection(rpcUrl, {commitment: "confirmed", confirmTransactionInitialTimeout: 360000})

var transaction = new web3.Transaction().add(...aha.instructions)
    transaction.feePayer = walletKeyPairhydra.publicKey
    transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
     await transaction.sign(walletKeyPairhydra)
     
    var transactionSignature = await connection.sendRawTransaction(
      transaction.serialize(),
      { skipPreflight: true }
    );
    console.log(transactionSignature)
}
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
  
     
      let connection = new Connection(rpcUrl, {commitment: "confirmed", confirmTransactionInitialTimeout: 360000})
  
  var transaction = new web3.Transaction().add(...aha.instructions)
      transaction.feePayer = walletKeyPair.publicKey
      transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
       await transaction.sign(walletKeyPair)
       
      var transactionSignature = await connection.sendRawTransaction(
        transaction.serialize(),
        { skipPreflight: true }
      );
      console.log(transactionSignature)
}
}, 10000)
}
}
console.log(1)
config.oracleState.finalized = true// = {"started": true}

await anchorProgram.createOrUpdateOracle({
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

if (randomAf){

config.oracleState.tokenTransfers =  [
  {
    // @ts-ignore
    "from": req.query.player,
    // @ts-ignore
    "to": req.query.player,
    // @ts-ignore
    "tokenTransferType": { "normal": true },
    // @ts-ignore
    
    "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
    // @ts-ignore
    "amount": config.tokensToJoin[0].amount * 0.96
  }  ,

  {
    // @ts-ignore
    "from": req.query.player,
    // @ts-ignore
    "to": "JAReaQwjLJACN89gJ4vLkqSbvbpx9uAmh1AEQy3NkPKb",
    // @ts-ignore
    "tokenTransferType": { "normal": true },
    // @ts-ignore
    
    "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
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
     
     "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
     // @ts-ignore
     "amount": config.tokensToJoin[0].amount * mod
   } )  
 }
} else {
  config.oracleState.tokenTransfers = [{ // authority 198`%; player 0%; 102% h
    // @ts-ignore
    "from": req.query.player,
    // @ts-ignore
    "to": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
    // @ts-ignore
    "tokenTransferType": { "normal": true },
    // @ts-ignore
    
    "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
    // @ts-ignore
    "amount": Math.floor((config.tokensToJoin[0].amount * 0.96))
  },
  {
    // @ts-ignore
    "from": req.query.player,
    // @ts-ignore
    "to": "JAReaQwjLJACN89gJ4vLkqSbvbpx9uAmh1AEQy3NkPKb",
    // @ts-ignore
    "tokenTransferType": { "normal": true },
    // @ts-ignore
    
    "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
    // @ts-ignore
    "amount": config.tokensToJoin[0].amount * 0.04
  } ]
  if (mod > 0){
    config.oracleState.tokenTransfers[0] = 
    { // authority 198`%; player 0%; 102% h
      // @ts-ignore
      "from": req.query.player,
      // @ts-ignore
      "to": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
      // @ts-ignore
      "tokenTransferType": { "normal": true },
      // @ts-ignore
      
      "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
      // @ts-ignore
      "amount": Math.floor((config.tokensToJoin[0].amount * 0.96) * 1-mod)
    }
    config.oracleState.tokenTransfers.push(
      { // authority 198`%; player 0%; 102% h
        // @ts-ignore
        "from": req.query.player,
        // @ts-ignore
        "to": req.query.player,
        // @ts-ignore
        "tokenTransferType": { "normal": true },
        // @ts-ignore
        
        "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
        // @ts-ignore
        "amount": Math.floor((config.tokensToJoin[0].amount * 0.96) * mod)
      }
    )
  }
}
let index = 0

const setup = config.tokensToJoin[index];

const walletKeyPairhydra = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('../reveal-worker-express/idhydra.json').toString())))//new Uint8Array(walletKey));
  const anchorWallethydra = new NodeWallet(walletKeyPairhydra)
const anchorProgram2 = await getMatchesProgram(anchorWallethydra, env, rpcUrl);
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



   
    let connection = new Connection(rpcUrl, {commitment: "confirmed", confirmTransactionInitialTimeout: 360000})

var transaction = new web3.Transaction().add(...aha.instructions)
    transaction.feePayer = walletKeyPairhydra.publicKey
    transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
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


   let connection = new Connection(rpcUrl, { commitment: "confirmed", confirmTransactionInitialTimeout: 360000})

   var transaction = new web3.Transaction().add(...aha.instructions)
       transaction.feePayer = walletKeyPair.publicKey
       transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
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
        new PublicKey("DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU"), // mint
        new PublicKey("AvzcGEMLJMt1USm4tWWSYAQYhGVBJPTKYEGnnuD6uA2M"), // to (should be a token account)
        walletKeyPairhydra.publicKey, // from's owner
        tokenAmount.value.uiAmount as number / 100 * 99, // amount, if your deciamls is 8, send 10^8 for 1 token
        tokenAmount.value.decimals // decimals
      )
    );
   

    transaction.feePayer = walletKeyPairhydra.publicKey
    transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
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
  }, 1500)
  }
}
   catch (err){
    console.log(err)
    lols.slice(lols.indexOf(req.query.player as string), 1)
  }
}
try {
  if (Object.keys(u.state)[0] != 'initialized'){
    if (!lols.includes(req.query.player as string)){
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
  lols.slice(lols.indexOf(req.query.player as string), 1)

//fs.unlinkSync('../reveal-worker-express/notpending/' + req.query.player) 
}
catch (err){
lols.slice(lols.indexOf(req.query.player as string), 1)
//fs.unlinkSync('../reveal-worker-express/notpending/' + req.query.player) 

}
  }

// //fs.unlinkSync('../reveal-worker-express/notpending/' + file) 
} catch (err){
  console.log(err)
  //fs.unlinkSync('../reveal-worker-express/notpending/' + req.query.player) 

// //fs.unlinkSync('../reveal-worker-express/notpending/' + file)

////fs.unlinkSync('../reveal-worker-express/notpending/' + req.query.player) 
lols.slice(lols.indexOf(req.query.player as string), 1)
}

}
} catch (err){
  console.log(err)
}
}, 10000)
try {
  config.tokensToJoin[0].amount = parseInt(req.query.risk as string)
}
catch (err)
{
  console.log(err)
}
  res.send(config);
}
else {
  res.send(500)
}
  } 
  catch (err){
    console.log(err)
  }
});

let lols: string[] = [] 




app.get("/reveal", async (req: express.Request, res: express.Response) => {
res.header("Access-Control-Allow-Origin", 'https://fair3d.me');
// @ts-ignore
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  // @ts-ignore
  res.json(await handleRequest(req.query.player, req.query.uuid, req.query.env));

})
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
      "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
      "amount": 1000,
      "sourceType": 1,
      "index": 1,
      "validationProgram": "nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"
    }   
  ]
}
let blarg = true 
let rpcUrl = "https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2"

    
setInterval(async function(){
  if (blarg){
blarg = false
  let c = 0;
  // @ts-ignore
  fs.readdirSync('../reveal-worker-express/pending').forEach(file => {
    //console.log(file);
    c++;
  });
  if (c != twofiddy){
    console.log(c)
  }
  if (c < twofiddy){
    let newseed = new Keypair().publicKey.toBase58();
    let arg = template 
    arg.oracleState.seed = newseed
    let configPath = '../reveal-worker-express/pending/'+new Date().getTime().toString()
    fs.writeFileSync(configPath, JSON.stringify(arg))
    

    //const walletKeyPair = loadWalletKey('../reveal-worker-express/id.json');
    const walletKeyPair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('../reveal-worker-express/id.json').toString())))//new Uint8Array(walletKey));
    console.log(`wallet public key: 4${walletKeyPair.publicKey}`);
    const anchorWallet = new NodeWallet(walletKeyPair)

    const anchorProgram = await getMatchesProgram(anchorWallet, env, rpcUrl);

    if (configPath === undefined) {
      throw new Error("The configPath is undefined");
    }
    const configString = fs.readFileSync(configPath);

    //@ts-ignore
    var config = JSON.parse(configString);
console.log('a')
try {
    await anchorProgram.createOrUpdateOracle({
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
  }
 blarg = true 
}
}, 2000)
// @ts-ignore to fix this, add .env
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running");
});


