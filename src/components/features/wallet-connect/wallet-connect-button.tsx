import React from 'react';
import { Button, HStack, Icon } from "@chakra-ui/react";
import { IWeb3Context, useWeb3Context } from "@/contexts/web-3-context";
import { FaEthereum } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";

const BSCTChainID = 97;

type WalletConnectButtonProps = {
  bg?: string;
};

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ bg }) => {
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain, provider },
  } = useWeb3Context() as IWeb3Context;

  return (
    <HStack
        width="full"
        as="header"
        height="80px"
        px={4}
        alignItems="center"
        bg={bg ? bg : "black"}
      >
        <HStack as="nav" width="full" justifyContent="space-between">
          <HStack>
            {!isAuthenticated ? (
              <Button
                onClick={connectWallet}
                variant="solid"
                bg="white"
                colorScheme="purple"
                gap={2}
                color="black"
              >
                <Icon as={FaEthereum} />
                Connect wallet
              </Button>
            ) : (
              <Button
                onClick={disconnect}
                variant="solid"
                bg="red.400"
                colorScheme="red"
                color="white"
                gap={2}
              >
                <Icon as={BiLogOut} />
                Disconnect
              </Button>
            )}
          </HStack>
        </HStack>
      </HStack>
  );
}

export default WalletConnectButton;