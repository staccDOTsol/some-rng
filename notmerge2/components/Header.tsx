import React from "react";
import { Box, Center, Flex, HStack, Icon, Text, Link, LinkProps } from "@chakra-ui/react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface IMenuItemProps extends LinkProps {
  isLast?: boolean;
}
export const Header: React.FC = () => (
  <Center
    w="full"
    paddingX={14}
    paddingY={2}
    justifyContent="space-between"
    alignItems="center"
    color="white"
    bg="grey"
  >
    <Box display={{ md: "block" }} flexBasis={{ base: "100%", md: "auto" }}>
      <HStack
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <WalletMultiButton />
        <WalletDisconnectButton />
      </HStack>
    </Box>
  </Center>
);
