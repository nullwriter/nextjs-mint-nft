import { useState } from 'react';
import { ethers } from 'ethers';
import { ERC20ABI, BUSD_CONTRACT_ADDRESS } from '@/utils/contract';
import { useToast } from '@chakra-ui/react';

interface ApproveBUSDHookProps {
  signer: ethers.Signer | null;
  ERC721_CONTRACT_ADDRESS: string;
  MINT_PRICE: {
    BUSD: string;
  };
}

const useApproveBUSD = ({signer, ERC721_CONTRACT_ADDRESS, MINT_PRICE}: ApproveBUSDHookProps) => {
  const [isApproving, setIsApproving] = useState(false);
  const toast = useToast();

  const approveBUSD = async () => {
    setIsApproving(true);

    try {
      // Initialize base ERC20 contract to interact with
      const busdContract = new ethers.Contract(BUSD_CONTRACT_ADDRESS, ERC20ABI, signer);
      const amountBUSD = ethers.parseUnits(MINT_PRICE.BUSD, 18);

      // Grab user approval to spend BUSD
      let approveTx = await busdContract.approve(ERC721_CONTRACT_ADDRESS, amountBUSD);
      await approveTx.wait();
      setIsApproving(false);
      
      return true;
    } catch (error) {
      toast({
        title: 'Error approving BUSD',
        description: JSON.stringify(error, null, 2),
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setIsApproving(false);
      return false;
    }
  };

  return { approveBUSD, isApproving };
};

export default useApproveBUSD;
