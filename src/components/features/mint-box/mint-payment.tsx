import React from 'react';
import { Box, Select, HStack, Button, Text} from '@chakra-ui/react';
import { CRYPTO, MINT_PRICE } from '@/utils/contract';

type MintPaymentProps = {
  paymentMethod: string;
  handleChangeCrypto: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  loadingState: number;
  isAuthenticated: boolean;
  isCorrectNetwork: boolean;
  mint: (paymentMethod: string) => Promise<void>;
};

const MintPayment = ({ 
  paymentMethod, 
  handleChangeCrypto, 
  loadingState,
  isAuthenticated,
  isCorrectNetwork,
  mint
}: MintPaymentProps) => {
  
  const getMintPrice = (): string => {
    return MINT_PRICE[paymentMethod as keyof typeof CRYPTO];
  }

  return (
    <HStack spacing='20px'>
      <Box w="100px">
        <Select 
          size="lg" 
          value={paymentMethod} 
          onChange={handleChangeCrypto}
          isDisabled={loadingState === 1}
        >
          <option value={CRYPTO.BNB}>BNB</option>
          <option value={CRYPTO.BUSD}>BUSD</option>
        </Select>
      </Box>
      <Button 
        colorScheme='whatsapp' 
        size='lg' 
        isDisabled={!isAuthenticated || !isCorrectNetwork}
        onClick={() => mint(paymentMethod)}
        isLoading={loadingState === 1}
      >
        MINT
      </Button>
      <Text>{getMintPrice()} {paymentMethod}</Text>
    </HStack>
  );
};

export default MintPayment;
