
import express, {Request, Response} from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {handleRequest} from "./coin-flip/handler";
import { Keypair } from "@solana/web3.js";



import fs from 'fs'
import { getMatchesProgram } from "./contract/matches";
import { BN, web3 } from "@project-serum/anchor";
import { getOracle } from "./utils/pda";
import { TokenType } from "./state/matches";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
let env = 'devnet'
if (fs.existsSync(".env")) {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
}
let twofiddy = 1

const app = express();
app.use(cors());


app.get("/", (_: Request, res: Response) => {
  res.send({message: "Dont forget to tip https://twitter.com/STACCart"});
});


app.get("/api", (_: Request, res: Response) => {
  res.send({message: "api is connected"});
});

app.get("/join",async (req: Request, res: Response) => {
  
  let c = Math.floor(Math.random() * twofiddy)
  let c2 = 0
  let config = template
  fs.readdirSync('./pending').forEach(file => {
    //console.log(file);
    if (c == c2){
      fs.copyFileSync ('./pending/' + file, './notpending/' + req.query.player)
    //  fs.unlinkSync('./pending/' + file)
      config = JSON.parse(fs.readFileSync('./notpending/' + req.query.player).toString())

      config.tokensToJoin[0].amount = parseInt(req.query.risk as string)
    }
    c2++;
  });
if (config.tokensToJoin[0].amount  < 0.5 * 10 ** 9){
  console.log('gud')
  const walletKeyPair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/Users/jarettdunn/.config/solana/id.json').toString())))//new Uint8Array(walletKey));
  const anchorWallet = new NodeWallet(walletKeyPair)
  console.log(`wallet public key: ${walletKeyPair.publicKey}`);
  console.log('joinnnnin')
  const anchorProgram = await getMatchesProgram(anchorWallet, env, rpcUrl);

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

let  actualOracle = config.winOracle
  ? new web3.PublicKey(config.winOracle)
  : (
      await getOracle(
        new web3.PublicKey(config.oracleState.seed),
        config.oracleState.authority
          ? new web3.PublicKey(config.oracleState.authority)
          : walletKeyPair.publicKey
      )
    )[0];


const matchInstance = await anchorProgram.fetchMatch(actualOracle);
setInterval(async function(){
const u = matchInstance.object;
if ( u.tokenTypesAdded.toNumber() > 0 ){
console.log(u)

let index = 0

const setup = config.tokensToJoin[index];
await anchorProgram.joinMatch(
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
let randomAf = Math.random() > 0.5
if (randomAf){
  // winner winner chicken dinner
  config.oracleState.tokenTransfers =  [{
    // @ts-ignore
    "from": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
    // @ts-ignore
    "to": file,
    // @ts-ignore
    "tokenTransferType": { "normal": true },
    
    // @ts-ignore
    "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
    // @ts-ignore
    "amount": setup.amount * 2 
  }
  ]
}
else {
  // srry
  config.oracleState.tokenTransfers =  [{
    // @ts-ignore
    "from": file,
    // @ts-ignore
    "to": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
    // @ts-ignore
    "tokenTransferType": { "normal": true },
    // @ts-ignore
    
    "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
    // @ts-ignore
    "amount": setup.amount * 2 
  }
  ]
}

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
const winOracle = config.winOracle
? new web3.PublicKey(config.winOracle)
: (
  await getOracle(
    new web3.PublicKey(config.oracleState.seed),

    config.oracleState.authority
      ? new web3.PublicKey(config.oracleState.authority)
      : walletKeyPair.publicKey
  )
)[0];
const oracleInstance = await anchorProgram.fetchOracle(winOracle);
for (let i = 0; i < oracleInstance.object.tokenTransfers.length; i++) {
const tfer = oracleInstance.object.tokenTransfers[i];

await anchorProgram.disburseTokensByOracle(
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
}

}
try {
await anchorProgram.drainMatch(
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
{
  seed: config.oracleState.seed,
  authority: config.oracleState.authority
    ? new web3.PublicKey(config.oracleState.authority)
    : walletKeyPair.publicKey,
},
{
  receiver: walletKeyPair.publicKey,
}
);

// fs.unlinkSync('./notpending/' + file) 
} catch (err){
// fs.unlinkSync('./notpending/' + file)

}


}, 5000)
  res.send(config);
}
else {
  res.send(500)
}
});
/*
setTimeout(async function(){
  const walletKeyPair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/Users/jarettdunn/.config/solana/id.json').toString())))//new Uint8Array(walletKey));
  //console.log(`wallet public key: ${walletKeyPair.publicKey}`);
  const anchorWallet = new NodeWallet(walletKeyPair)

  const anchorProgram = await getMatchesProgram(anchorWallet, env, rpcUrl);
  let actualOracle = null;
 
  fs.readdirSync('./notpending').forEach(async file => {
    let config = JSON.parse(fs.readFileSync('./notpending/' + file).toString())
    
      actualOracle = config.winOracle
        ? new web3.PublicKey(config.winOracle)
        : (
            await getOracle(
              new web3.PublicKey(config.oracleState.seed),
              config.oracleState.authority
                ? new web3.PublicKey(config.oracleState.authority)
                : walletKeyPair.publicKey
            )
          )[0];
    
  
    const matchInstance = await anchorProgram.fetchMatch(actualOracle);
  setInterval(async function(){
    const u = matchInstance.object;
    if ( u.tokenTypesAdded.toNumber() > 0 ){
      console.log(u)

      let index = 0
   
      const setup = config.tokensToJoin[index];
      await anchorProgram.joinMatch(
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
      let randomAf = Math.random() > 0.5
      if (randomAf){
        // winner winner chicken dinner
        config.oracleState.tokenTransfers =  [{
          "from": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
          "to": file,
          "tokenTransferType": { "normal": true },
          
          "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
          "amount": setup.amount * 2 
        }
        ]
      }
      else {
        // srry
        config.oracleState.tokenTransfers =  [{
          "from": file,
          "to": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
          "tokenTransferType": { "normal": true },
          
          "mint": "DuYjPmjmWnYsuAhGU5RXceUoDMB1Nfonf8GkpQYzUUJU",
          "amount": setup.amount * 2 
        }
        ]
      }

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
    const winOracle = config.winOracle
    ? new web3.PublicKey(config.winOracle)
    : (
        await getOracle(
          new web3.PublicKey(config.oracleState.seed),

          config.oracleState.authority
            ? new web3.PublicKey(config.oracleState.authority)
            : walletKeyPair.publicKey
        )
      )[0];
  const oracleInstance = await anchorProgram.fetchOracle(winOracle);
  for (let i = 0; i < oracleInstance.object.tokenTransfers.length; i++) {
    const tfer = oracleInstance.object.tokenTransfers[i];

    await anchorProgram.disburseTokensByOracle(
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
  }

    }
    try {
    await anchorProgram.drainMatch(
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
      {
        seed: config.oracleState.seed,
        authority: config.oracleState.authority
          ? new web3.PublicKey(config.oracleState.authority)
          : walletKeyPair.publicKey,
      },
      {
        receiver: walletKeyPair.publicKey,
      }
    );

   // fs.unlinkSync('./notpending/' + file) 
    } catch (err){
     // fs.unlinkSync('./notpending/' + file)

    }
  
  })
}, 5000)
}, 5000)
*/

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
  "winOracleCooldown": 10,
  "space": 300,
  "minimumAllowedEntryTime": null,
  "tokenEntryValidation": null,
  "authority": "JARehRjGUkkEShpjzfuV4ERJS25j8XhamL776FAktNGm",
  "leaveAllowed": false,
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
      "amount": 1,
      "sourceType": 1,
      "index": 1,
      "validationProgram": "nameAxQRRBnd4kLfsVoZBBXfrByZdZTkh8mULLxLyqV"
    }   
  ]
}
let rpcUrl = "https://ssc-dao.genesysgo.net/"
setInterval(async function(){
  let c = 0;
  // @ts-ignore
  fs.readdirSync('./pending').forEach(file => {
    //console.log(file);
    c++;
  });
  console.log(c)
  if (c < twofiddy){
    let newseed = new Keypair().publicKey.toBase58();
    let arg = template 
    arg.oracleState.seed = newseed
    let configPath = './pending/'+new Date().getTime().toString()
    fs.writeFileSync(configPath, JSON.stringify(arg))
    

    //const walletKeyPair = loadWalletKey('/Users/jarettdunn/.config/solana/id.json');
    const walletKeyPair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync('/Users/jarettdunn/.config/solana/id.json').toString())))//new Uint8Array(walletKey));
    console.log(`wallet public key: ${walletKeyPair.publicKey}`);
    const anchorWallet = new NodeWallet(walletKeyPair)

    const anchorProgram = await getMatchesProgram(anchorWallet, env, rpcUrl);

    if (configPath === undefined) {
      throw new Error("The configPath is undefined");
    }
    const configString = fs.readFileSync(configPath);

    //@ts-ignore
    const config = JSON.parse(configString);

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

  }
  
}, 1500)
// @ts-ignore to fix this, add .env
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running");
});


