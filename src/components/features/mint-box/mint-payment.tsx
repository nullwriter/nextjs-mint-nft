import React from 'react';
import { Box, Select, HStack, Button, Text, VStack} from '@chakra-ui/react';
import { CRYPTO, MINT_PRICE } from '@/utils/contract';
import { useApproveBUSD, useMintNFT } from '@/hooks';
import { ERC721_CONTRACT_ADDRESS } from '@/utils/contract';

type MintPaymentProps = {
  children: React.ReactNode;
  contract: any;
  signerAddress: string;
  signer: any;
  getMintedNFT: (address: string | null) => Promise<void>;
};

const MintPayment = ({ children, contract, signerAddress, signer, getMintedNFT }: MintPaymentProps) => {
  const { approveBUSD } = useApproveBUSD({ signer, ERC721_CONTRACT_ADDRESS, MINT_PRICE });
  const { mint, loadingState } = useMintNFT({ contract, signerAddress, approveBUSD, getMintedNFT });
  const [paymentMethod, setPaymentMethod] = React.useState<string>(CRYPTO.BNB);

  const handleChangeCrypto = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const getMintPrice = (): string => {
    return MINT_PRICE[paymentMethod as keyof typeof CRYPTO];
  };

  return (
    <>
      <HStack spacing='20px'>
        <VStack
          spacing={4}
          align='stretch'
        > 
          <Box w="400px">
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
            onClick={() => mint(paymentMethod)}
            isLoading={loadingState === 1}
          >
            MINT <Text ml="5">{getMintPrice()} {paymentMethod}</Text>
          </Button>
        </VStack>
        <VStack>
          {children}
        </VStack>
      </HStack>
    </>
  );
};

export default MintPayment;
