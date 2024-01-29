import { Card, CardHeader, CardBody, CardFooter, Box } from '@chakra-ui/react'
import WalletConnectButton from './wallet-connect-button';
import { Button } from "@chakra-ui/react";
import { useWeb3Context, IWeb3Context } from '@/contexts/web-3-context';

const MintNFT = () => {
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain, provider },
  } = useWeb3Context() as IWeb3Context;

  return (
    <div className='w-100'>
      <Box className="w-100">
        <Card size="lg" bg={'black'}>
          <CardBody>
            <WalletConnectButton bg="black" />
          </CardBody>
        </Card>
      </Box>
      <Box className="w-100">
        <Card size="lg" className='mt-3'>
          <CardHeader>Mint NFT</CardHeader>
          <CardBody className='flex justify-center'>
            <Button colorScheme='whatsapp' size='lg'>MINT</Button>
          </CardBody>
        </Card>
      </Box>
    </div>
  );
}

export default MintNFT;