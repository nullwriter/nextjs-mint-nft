import React from 'react';
import { Card, CardBody, Box, Container } from '@chakra-ui/react';
import { useWeb3Context, IWeb3Context } from '@/contexts/web-3-context';
import { ERC721ABI, ERC721_CONTRACT_ADDRESS } from '@/utils/contract';
import { useContract, useMintedNFTs, } from '@/hooks';
import WalletConnect from '@/components/features/wallet-connect';
import MintPayment from '@/components/features/mint-box/mint-payment';
import NetworkStatus from '@/components/features/mint-box/network-status';
import NFTDisplay from '@/components/features/mint-box/nft-display';

const MintNFT = () => {
  const {
    state: { isAuthenticated, address, currentChain },
  } = useWeb3Context() as IWeb3Context;
  const { contract, signerAddress, signer } = useContract(ERC721_CONTRACT_ADDRESS, ERC721ABI);
  const { nfts, getMintedNFT } = useMintedNFTs(contract);

  React.useEffect(() => {
    getMintedNFT(address);
  }, [address]);
  
  return (
    <Container maxW='container.sm'>
      <WalletConnect />
      <Box className="w-100">
        <Card size="lg" className='mt-3'>
          <CardBody className='flex justify-center'>
            <MintPayment  {...{ contract, signerAddress, signer, getMintedNFT }}>
              <NetworkStatus {...{ currentChain }} />
            </MintPayment>
          </CardBody>
        </Card>
      </Box>
      <NFTDisplay {...{ nfts, isAuthenticated }} />
    </Container>
  );
}

export default MintNFT;