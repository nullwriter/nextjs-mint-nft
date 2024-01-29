import React from 'react';
import { 
  Card,  
  CardBody, 
  CardFooter, 
  Box, 
  Container, 
} from '@chakra-ui/react';
import { useWeb3Context, IWeb3Context } from '@/contexts/web-3-context';
import { 
  ERC721ABI, 
  ERC721_CONTRACT_ADDRESS,
  MINT_PRICE,
  CRYPTO
} from '@/utils/contract';
import { 
  useContract, 
  useCheckCorrectNetwork, 
  useMintedNFTs, 
  useApproveBUSD, 
  useMintNFT
} from '@/hooks';
import WalletConnect from '@/components/features/wallet-connect';
import MintPayment from '@/components/features/mint-box/mint-payment';
import NetworkStatus from '@/components/features/mint-box/network-status';
import NFTDisplay from '@/components/features/mint-box/nft-display';

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
      <NFTDisplay {...{ nfts, isAuthenticated }} />
    </Container>
  );
}

export default MintNFT;