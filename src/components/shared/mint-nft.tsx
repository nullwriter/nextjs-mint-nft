import React from 'react';
import { 
  Card,  
  CardBody, 
  CardFooter, 
  Box, 
  Image, 
  Grid, 
  GridItem, 
  Container, 
  Heading, 
  Text, 
  Stack,
  Select,
  HStack
} from '@chakra-ui/react'
import WalletConnectButton from './wallet-connect-button';
import { Button } from "@chakra-ui/react";
import { useWeb3Context, IWeb3Context } from '@/contexts/web-3-context';
import { 
  ERC721ABI, 
  ERC721_CONTRACT_ADDRESS,
  MINT_PRICE,
  CRYPTO
} from '@/utils/contract';
import useContract from '@/hooks/use-contract';
import useCheckCorrectNetwork from '@/hooks/use-check-correct-network';
import useMintedNFTs from '@/hooks/use-minted-nfts';
import useApproveBUSD from '@/hooks/use-approve-busd';
import useMintNFT from '@/hooks/use-mint-nft';

const MintNFT = () => {
  
  /************ Hooks ************/
  const {
    state: { isAuthenticated, address, currentChain },
  } = useWeb3Context() as IWeb3Context;
  const { contract, signerAddress, signer } = useContract(ERC721_CONTRACT_ADDRESS, ERC721ABI);
  const { isCorrectNetwork, message } = useCheckCorrectNetwork(currentChain);
  const { nfts, getMintedNFT } = useMintedNFTs(contract);
  const { approveBUSD, isApproving } = useApproveBUSD({
    signer,
    ERC721_CONTRACT_ADDRESS,
    MINT_PRICE
  });
  const { mint, loadingState } = useMintNFT({ contract, signerAddress, approveBUSD });

  /************ State ************/
  const [paymentMethod, setPaymentMethod] = React.useState<string>(CRYPTO.BNB);
  
  const handleChangeCrypto = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const getMintPrice = (): string => {
    return MINT_PRICE[paymentMethod as keyof typeof CRYPTO];
  }

  React.useEffect(() => {
    getMintedNFT(address);
  }, [address]);
  
  return (
    <Container maxW='container.sm'>
      <Box className="w-100 flex justify-center">
        <Card size="lg" bg={'black'}>
          <CardBody>
            <WalletConnectButton bg="black" />
          </CardBody>
        </Card>
      </Box>
      <Box className="w-100">
        <Card size="lg" className='mt-3'>
          <CardBody className='flex justify-center'>
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
          </CardBody>
          <CardFooter>
            {isCorrectNetwork ? (
              <div>
                <p className="text-green-500">{message}</p>
                {address && <p>Address: {address}</p>}
              </div>
            ) : (
              <p className="text-red-500">{message}</p>
            )}
          </CardFooter>
        </Card>
      </Box>
      <Box className='flex my-10 flex-col text-center'>
        <Heading as="h2" size="xl" color="white" className='mb-8'>
          Your NFTs
        </Heading>
        
        {(nfts.length > 0 && isAuthenticated) ? (
          <Grid templateColumns='repeat(4, 1fr)' gap={10}>
            {nfts.map((nftUrl: string, i: number) => (
              <GridItem w='100%' h='100%' key={`nft-${i}`}>
                <Image sizes='sm' src={nftUrl} />
              </GridItem>
            ))}
          </Grid>
        ) : isAuthenticated ? (
          <Stack direction='column'>
            <Text fontSize='lg'>
              You have no TCBT yet
            </Text>
            <Button size='sm' onClick={() => getMintedNFT(address)}>Click here to check again</Button>
          </Stack>
        ) : (
          <Text fontSize='lg'>
            Please connect your wallet to see your TCBT
          </Text>
        )}
      </Box>
    </Container>
  );
}

export default MintNFT;