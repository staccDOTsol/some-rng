import React, {useEffect, useState} from "react";
import {Connection, LAMPORTS_PER_SOL} from "@solana/web3.js";
import {useAnchorWallet} from "@solana/wallet-adapter-react";
import {initializeCoin, mintCoin} from "./dice-instructions";
import {house} from "./constants";
import {sendTransactionWithRetryWithKeypair} from "./transactions";
import {styled} from '@mui/material/styles';
import {WalletDialogButton} from "@solana/wallet-adapter-material-ui";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Button, FilledInput, FormControl, InputAdornment, InputLabel} from "@mui/material";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";

const ConnectButton = styled(WalletDialogButton)``;
const solConnection = new Connection("https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/");
// @ts-ignore
const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

enum Stage {
  PreBet,
  RevealPending
}

const Home = () => {
  const [balance, setBalance] = useState<number>();
  const [bet, setBet] = useState<number>(0.2);
  const wallet = useAnchorWallet();
  const [stage, setStage] = useState<Stage>(Stage.PreBet);
  const [uuid, setUuid] = useState<string | null>(null);
  const [msg, setMsg] = useState<string>("");

  const setBetAmount = (e: any) => {
    try {
      const num = parseFloat(e.target.value);
      if (num >= 1) {
        setBet(1);
      } else if (num <= 0.1) {
        setBet(0.1);
      } else {
        setBet(num);
      }
    } catch (e) {
    }
  }

  const initStage = async () => {
    if (!wallet) return;
    if (!bet) return;
    if (!balance) return;

    setMsg('');
    setStage(Stage.RevealPending);
    const instructions = [];
    const localUuid = uuidv4().slice(0, 8);
    setUuid(localUuid);
    instructions.push(await initializeCoin(wallet, house, localUuid));
    instructions.push(await mintCoin(wallet, bet, localUuid));
    const txn = await sendTransactionWithRetryWithKeypair(solConnection, wallet, instructions, [], 'singleGossip', false);

    const resp = await axios.get('https://warm-river-90393.herokuapp.com/reveal', {
      params: {
        player: wallet.publicKey.toBase58(),
        uuid: localUuid,
        env: "devnet"
      }
    });

    setMsg(`You ${resp.data.status}!`);
    setStage(Stage.PreBet);
  }

  const updateBalance = async () => {
    if (!wallet) return;
    try {
      const bal = await solConnection.getBalance(wallet.publicKey);
      setBalance(bal / LAMPORTS_PER_SOL);
    } catch (e) {
    }
  }

  useEffect(() => {
    (async () => {
      await updateBalance();
    })();
  }, [wallet]);

  const interval = setInterval(() => {
    (async () => {
      await updateBalance();
    })()
  }, 1000);

  return (
      <>
        <main className="container">
          {wallet && <p className="pp">Balance: {(balance || 0).toLocaleString()} SOL</p>}
          {!wallet && <ConnectButton>Connect Wallet</ConnectButton>}
          {wallet && stage == Stage.PreBet && <div>
            <Grid container spacing={0}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Item>
                  <FormControl fullWidth sx={{m: 1}} variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                    <FilledInput
                        type={"number"}
                        autoFocus={true}
                        inputProps={{"step": 0.1}}
                        id="filled-adornment-amount"
                        value={bet}
                        onChange={setBetAmount}
                        startAdornment={<InputAdornment position="start">Bet:</InputAdornment>}
                    />
                  </FormControl>
                </Item>
                <Item>
                  <Button variant="outlined" onClick={initStage}>Flip Coin</Button>
                </Item>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>

          </div>}
          {wallet && stage == Stage.RevealPending && <div>
            <Grid container spacing={0}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <h1>Flipping & revealing...</h1>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </div>}
          <Grid container spacing={0}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <h2 className="pp">{msg}</h2>
            </Grid>
            <Grid item xs={4}></Grid></Grid>
        </main>
      </>
  );
}

export default Home;
