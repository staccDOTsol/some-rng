// @ts-nocheck
import Gun from 'gun';

import React, {useState} from "react";
import { useStrataSdks } from "@strata-foundation/react";
import { SplTokenCollective } from "@strata-foundation/spl-token-collective";
import { SplTokenBonding } from "@strata-foundation/spl-token-bonding";
import { PublicKey } from "@solana/web3.js";
import { Button } from 'antd';

import State from '../State.js';


const gun = Gun(['https://notiris.herokuapp.com/gun', 'https://gun-us.herokuapp.com/gun', 'https://gun-rs.iris.to/gun']);

export interface ITokenState {
  tokenRef?: PublicKey;
  tokenBonding?: PublicKey;
}

async function create(pub: any, setMRef: any,name: string, tick: string, tokenCollectiveSdk: SplTokenCollective, tokenBondingSdk: SplTokenBonding): Promise<ITokenState> {
 var collective = new PublicKey("B5pFg6U4PRqosNNShoP5j6qB2gbocuk8H6izKq3zk7mr");
 var curve = new PublicKey("DoSQAYPx3DCS79xDBLHFk5iSZT47TeemSQj71V3sYvDe");
 var { ownerTokenRef, tokenBonding } = await tokenCollectiveSdk.createSocialToken({
  isPrimary: true, // Creates a social token explicitly associated with the collective by pda, instead of the wallet alone.
 collective,
  metadata: {
    name: name,
    symbol: tick,
    uri: "https://raw.githubusercontent.com/luvfreedom/strata-marketplace/master/json.json",
  },
  ignoreIfExists: true, // If a Social Token already exists for this wallet, ignore.
  tokenBondingParams: {
    curve,
    buyBaseRoyaltyPercentage: 5,
    buyTargetRoyaltyPercentage: 5,
    sellBaseRoyaltyPercentage: 5,
    sellTargetRoyaltyPercentage: 5
  }
});
gun.user(pub).get('profile').get('tokenState').put({ tokenRef: ownerTokenRef.toBase58(), tokenBonding: tokenBonding.toBase58() });

if (ownerTokenRef){
setMRef("Yuor token is " + ownerTokenRef.toBase58() + " and 2nd key is " + tokenBonding.toBase58() + " - share this with others to let them trade your tokens. Or not")
}
//var tokenBondingAcct = await tokenBondingSdk.getTokenBonding(tokenBonding);
//var ownerTokenRefAcct = await SplTokenCollective.getTokenRef(ownerTokenRef);

return {
    tokenRef:  ownerTokenRef,
    tokenBonding: tokenBonding!
  }
}


export function CreateButton(pub, {tokenState}) {
  const { tokenCollectiveSdk, tokenBondingSdk  } = useStrataSdks();
  const [ name, setName ] = useState("<3 Freedom");;
  const [ tick, setTick ] = useState("FREE");
  const [ mRef, setMRef ] = useState("");
  const [ first, setFirst ] = useState(true);
  function change(event: any) {    setName(event.target.value);  }
  function change2(event: any) {    setTick(event.target.value);  }

  return (<div><label>{mRef}
          <br /> <br /> Name:
         <br />
          <input type="text" value={name} onChange={change} />       </label>
         <br />
         <br />
          <label>
          Symbol:
         <br />
          <input type="text" value={tick} onChange={change2} />       </label>
         <br /> 
          <Button style={{color:"black"}}
    onClick={async () => {
      if (SplTokenCollective && !name.includes('<3')) {
        // @ts-ignore
        tokenState= (await create(pub, setMRef, name, tick, tokenCollectiveSdk as SplTokenCollective, tokenBondingSdk as SplTokenBonding))
      }
      else if (SplTokenCollective){
        alert ('please rename your token before publishing it :)')
      }
    }}
  >; <br />
    Tokenize!
  </Button>
  <br />
  <br />
  <br />
  <br />
  <br />
  </div>)
}