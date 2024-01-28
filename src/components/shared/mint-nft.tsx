import { Card, CardHeader, CardBody, CardFooter, Box } from '@chakra-ui/react'
import WalletConnectButton from './wallet-connect-button';

const MintNFT = () => {
  return (
    <Box className="p-auto">
      <Card size="lg">
        <CardHeader>Mint NFT</CardHeader>
        <CardBody>
          <WalletConnectButton bg="white" />
        </CardBody>
      </Card>
    </Box>
  );
}

export default MintNFT;