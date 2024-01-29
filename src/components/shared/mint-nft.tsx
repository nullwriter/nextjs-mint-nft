import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Box, Image } from '@chakra-ui/react'
import WalletConnectButton from './wallet-connect-button';
import { Button } from "@chakra-ui/react";
import { useWeb3Context, IWeb3Context } from '@/contexts/web-3-context';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '@/utils/contract';
import useContract from '@/hooks/use-contract';
import useCheckCorrectNetwork from '@/hooks/use-check-correct-network';
import useMintedNFTs from '@/hooks/use-minted-nfts';

const MintNFT = () => {
  const {
    state: { isAuthenticated, address, currentChain },
  } = useWeb3Context() as IWeb3Context;
  const { contract, signerAddress } = useContract(contractAddress, contractABI);
  const { isCorrectNetwork, message } = useCheckCorrectNetwork(currentChain);
  const { nfts, getMintedNFT } = useMintedNFTs(contract, signerAddress);

  const [miningStatus, setMiningStatus] = React.useState<number>(-1);
  const [loadingState, setLoadingState] = React.useState<number>(-1);

  const mintCharacter = async (): Promise<void> => {
    try {
      if (contract) {
        let nftTx = await contract.safeMint(signerAddress, {
          value: ethers.parseEther('0.05'),
        });
        console.log('Mining....', nftTx.hash);
        setMiningStatus(0);

        let tx = await nftTx.wait();
        setLoadingState(1);
        console.log('Mined!', tx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error minting character', error);
      }
    } finally {
      setMiningStatus(-1);
      setLoadingState(-1);
    }
  };
  
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
            <Button 
              colorScheme='whatsapp' 
              size='lg' 
              isDisabled={!isAuthenticated || !isCorrectNetwork}
              onClick={mintCharacter}
              isLoading={miningStatus === 0}
            >
              MINT
            </Button>
            <Button onClick={getMintedNFT}>
              tokens of owner
            </Button>
          </CardBody>
          <CardFooter>
            {isCorrectNetwork ? (
              <div>
                <p className="text-green-500">{message}</p>
                <p>Address: {address}</p>
              </div>
            ) : (
              <p className="text-red-500">{message}</p>
            )}
          </CardFooter>
        </Card>
        <div className='flex'>
          {nfts.map((nftUrl: string, i: number) => (
            <Box maxW="sm">
              <Image sizes='sm' src={nftUrl} key={`nft-${i}`} />
            </Box>
          ))}
        </div>
      </Box>
    </div>
  );
}

export default MintNFT;