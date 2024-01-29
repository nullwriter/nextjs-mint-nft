import React from 'react';

const uriBase = 'https://ipfs.io/ipfs/Qmd8GExEdHe3FTNvf3YsLXX43DBXfUyUF8W9H1o6bX8tfY/';

const useMintedNFTs = (contract: any, signerAddress: string) => {
  const [nfts, setNfts] = React.useState<string[]>([]);

  const getMintedNFT = async (): Promise<void> => {
    if (!contract || !signerAddress) {
      console.error('Contract or signerAddress is not provided');
      return;
    }

    try {
      const tokensOfOwnerTx = await contract.tokensOfOwner(signerAddress);
      const tokenUrls = tokensOfOwnerTx
        .map((tokenId: bigint) => `${uriBase}${Number(tokenId)}.jpeg`);
      setNfts(tokenUrls);
    } catch (error) {
      console.error('Error getting tokens', error);
    }
  };

  // Return the state and the function that updates it
  return { nfts, getMintedNFT };
};

export default useMintedNFTs;
