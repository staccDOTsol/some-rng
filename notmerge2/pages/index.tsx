import { Swap } from '@strata-foundation/react';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { PublicKey } from '@solana/web3.js';
import React from 'react';
import { useRouter } from 'next/router'
import fetch from 'node-fetch';

import { Toaster } from 'react-hot-toast';
import { CreateButton, ITokenState } from '../components/CreateButton';
import { TokenDisplay } from '../components/TokenDisplay';
import styles from '../styles/Home.module.css';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      foo: "bar"
    }
  }
}

const Home: NextPage = ({ foo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const router = useRouter()
    // @ts-ignore
    const [tokenState, setTokenState] = React.useState<ITokenState>({"tokenRef": new PublicKey(router.query.tokenRef), "tokenBonding": new PublicKey(router.query.tokenBonding)});

    const pub  = router.query.pub;
    const mine = router.query.mine;
  
  
          // @ts-ignore
  return (
    <div className={styles.container}>
      <Head>
        <title>Autist Design</title>
        <meta name="description" content="Your Money, Your Way, Ditch the Dollar." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
          <TokenDisplay  {...tokenState} />
          <div style={{ width: "400px" }}>
            {tokenState.tokenBonding && <Swap tokenBondingKey={tokenState.tokenBonding} />}
          </div>
          <Toaster
            position="bottom-center"
            containerStyle={{
              margin: "auto",
              width: "420px",
            }}
          />
          {
          
          // @ts-ignore
          mine && <CreateButton pub={pub} setTokenState={setTokenState} />}
          
      </main>
    </div>
  );
};

export default Home;
