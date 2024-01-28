import { Button, HStack, Icon } from "@chakra-ui/react";
import { IWeb3Context, useWeb3Context } from "@/contexts/web-3-context";
import { FaEthereum } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";

const BSCTChainID = 97;

const WalletConnectButton = () => {
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
        bg="black"
      >
        <HStack as="nav" width="full" justifyContent="space-between">
          <HStack>
            {!isAuthenticated ? (
              <Button
                onClick={connectWallet}
                variant="solid"
                bg="blue.400"
                colorScheme="blue"
                gap={2}
                color="white"
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