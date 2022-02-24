import React from "react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const Header: React.FC = () => (
<div>
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
);