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
import WalletConnect from '@/components/wallet-connect';
import MintPayment from '../mint/mint-payment';
import NetworkStatus from '../mint/network-status';

const MintNFT = () => {
  
  /************ Hooks ************/
  const {
    state: { isAuthenticated, address, currentChain },
  } = useWeb3Context() as IWeb3Context;
  const { contract, signerAddress, signer } = useContract(ERC721_CONTRACT_ADDRESS, ERC721ABI);
  const { isCorrectNetwork, message } = useCheckCorrectNetwork(currentChain);
  const { nfts, getMintedNFT } = useMintedNFTs(contract);
  const { approveBUSD } = useApproveBUSD({
    signer,
    ERC721_CONTRACT_ADDRESS,
    MINT_PRICE
  });
  const { mint, loadingState } = useMintNFT({ contract, signerAddress, approveBUSD, getMintedNFT });

  /************ State ************/
  const [paymentMethod, setPaymentMethod] = React.useState<string>(CRYPTO.BNB);
  
  /************ Functions ************/
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
      <WalletConnect />
      <Box className="w-100">
        <Card size="lg" className='mt-3'>
          <CardBody className='flex justify-center'>
            <MintPayment 
              {...{ 
                paymentMethod, 
                handleChangeCrypto, 
                loadingState, 
                isAuthenticated, 
                isCorrectNetwork, 
                mint 
              }}
            />
          </CardBody>
          <CardFooter>
            <NetworkStatus {...{ isCorrectNetwork, message, address }} />
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
        ) : (
          <Stack direction='column'>
            <Text fontSize='lg'>
              {isAuthenticated ? (
                'You have no TCBT yet'
              ) : (
                'Please connect your wallet to see your TCBT'
              )}
            </Text>
          </Stack>
        )}
      </Box>
    </Container>
  );
}

export default MintNFT;