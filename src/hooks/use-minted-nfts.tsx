import React from 'react';
import { URI_BASE } from '@/utils/contract';

const useMintedNFTs = (contract: any) => {
  const [nfts, setNfts] = React.useState<string[]>([]);

  const getMintedNFT = async (address: string | null): Promise<void> => {
    if (!contract || !address) {
      return;
    }

    // Query readonly contract method to get all tokens owned by address
    try {
      const tokensOfOwnerTx = await contract.tokensOfOwner(address);
      const tokenUrls = tokensOfOwnerTx
        .map((tokenId: bigint) => `${URI_BASE}${Number(tokenId)}.jpeg`);
      setNfts(tokenUrls);
    } catch (error) {
      console.error('Error getting tokens', error);
    }
  };

  // Return the state and the function that updates it
  return { nfts, getMintedNFT };
};

export default useMintedNFTs;
