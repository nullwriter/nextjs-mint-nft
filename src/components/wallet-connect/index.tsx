import React from 'react';
import WalletConnectButton from './wallet-connect-button';
import { Card, CardBody, Box } from '@chakra-ui/react';

const WalletConnect = () => {
  return (
    <Box className="w-100 flex justify-center">
      <Card size="lg" bg={'black'}>
        <CardBody>
          <WalletConnectButton bg="black" />
        </CardBody>
      </Card>
    </Box>
  );
};

export default WalletConnect;