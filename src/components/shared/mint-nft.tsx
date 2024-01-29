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
  Stack 
} from '@chakra-ui/react'
import WalletConnectButton from './wallet-connect-button';
import { Button } from "@chakra-ui/react";
import { useWeb3Context, IWeb3Context } from '@/contexts/web-3-context';
import { ethers } from 'ethers';
import { ERC721ABI, ERC721_CONTRACT_ADDRESS, ERC20ABI, BUSD_CONTRACT_ADDRESS } from '@/utils/contract';
import useContract from '@/hooks/use-contract';
import useCheckCorrectNetwork from '@/hooks/use-check-correct-network';
import useMintedNFTs from '@/hooks/use-minted-nfts';

const MINT_PRICE = {
  BNB: '0.02',
  BUSD: '5',
};

const CRYPTO = {
  BNB: 'BNB',
  BUSD: 'BUSD',
};

const MintNFT = () => {
  const {
    state: { isAuthenticated, address, currentChain },
  } = useWeb3Context() as IWeb3Context;
  const { contract, signerAddress, signer } = useContract(ERC721_CONTRACT_ADDRESS, ERC721ABI);
  const { isCorrectNetwork, message } = useCheckCorrectNetwork(currentChain);
  const { nfts, getMintedNFT } = useMintedNFTs(contract, signerAddress);

  const [miningStatus, setMiningStatus] = React.useState<number>(-1);
  const [loadingState, setLoadingState] = React.useState<number>(-1);
  const [paymentMethod, setPaymentMethod] = React.useState<string>('BUSD');

  const approveBUSD = async () => {
    const busdContract = new ethers.Contract(BUSD_CONTRACT_ADDRESS, ERC20ABI, signer);
    const amountBUSD = ethers.parseUnits(MINT_PRICE.BUSD, 18);

    // Approve allowance
    let approveTx = await busdContract.approve(ERC721_CONTRACT_ADDRESS, amountBUSD);
    await approveTx.wait(); 
  };

  const mint = async (): Promise<void> => {
    try {
      if (contract) {
        setLoadingState(1);
        let nftTx;
        
        if (paymentMethod === CRYPTO.BNB) {
          nftTx = await contract.safeMint(signerAddress, {
            value: ethers.parseEther(MINT_PRICE.BNB), // BNB payment
          });
        } else if (paymentMethod === CRYPTO.BUSD) {
          approveBUSD();
          const amountBUSD = ethers.parseUnits(MINT_PRICE.BUSD, 18); // BUSD payment
          nftTx = await contract.safeMintWithBUSD(signerAddress, amountBUSD);
        }

        console.log('Mining....', nftTx.hash);
        setMiningStatus(0);

        let tx = await nftTx.wait();
        console.log('Mined!', tx);
        getMintedNFT();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error minting', error);
      }
    } finally {
      setMiningStatus(-1);
      setLoadingState(-1);
    }
  };
  
  React.useEffect(() => {
    getMintedNFT();
  }, [signerAddress]);
  
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
            <Button 
              colorScheme='whatsapp' 
              size='lg' 
              isDisabled={!isAuthenticated || !isCorrectNetwork}
              onClick={mint}
              isLoading={miningStatus === 0}
              className='mt-10'
            >
              MINT TCBT
            </Button>
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
            <Button size='sm' onClick={getMintedNFT}>Click here to check again</Button>
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