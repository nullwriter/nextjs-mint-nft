import React from 'react';
import { ethers } from 'ethers';

const useContract = (contractAddress: string, contractABI: any) => {
  const [contract, setContract] = React.useState<ethers.Contract | null>(null);
  const [signerAddress, setSignerAddress] = React.useState<string>('');
  const [signer, setSigner] = React.useState<ethers.Signer | null>(null);

  React.useEffect(() => {
    const initContract = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const { ethereum } = window as any;
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(contract);
          setSignerAddress(address);
          setSigner(signer);
        } catch (error) {
          console.error('Error initializing contract:', error);
        }
      }
    };

      initContract();
  }, [contractAddress, contractABI]);

  return { contract, signerAddress, signer };
};

export default useContract;