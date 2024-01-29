import { useState } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@chakra-ui/react';
import { CRYPTO, MINT_PRICE } from '@/utils/contract';

interface MintNFTHookProps {
  contract: ethers.Contract | null;
  signerAddress: string;
  approveBUSD: () => Promise<boolean>;
}

const useMintNFT = ({ contract, signerAddress, approveBUSD }: MintNFTHookProps) => {
  const toast = useToast();
  const [loadingState, setLoadingState] = useState<number>(-1);

  const mint = async (paymentMethod: string): Promise<void> => {
    try {
      if (contract) {
        setLoadingState(1);
        let nftTx;

        if (paymentMethod === CRYPTO.BNB) {
          nftTx = await contract.safeMint(signerAddress, {
            value: ethers.parseEther(MINT_PRICE.BNB),
          });
        } else if (paymentMethod === CRYPTO.BUSD) {
          const approvalSuccessful = await approveBUSD();
          if (!approvalSuccessful) {
            setLoadingState(-1);
            return;
          }
          const amountBUSD = ethers.parseUnits(MINT_PRICE.BUSD, 18);
          nftTx = await contract.safeMintWithBUSD(signerAddress, amountBUSD);
        }

        await nftTx.wait();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error minting',
          description: JSON.stringify(error, null, 2),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } finally {
      setLoadingState(-1);
    }
  };

  return { mint, loadingState };
};

export default useMintNFT;
