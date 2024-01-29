import React from 'react';
import { Box, Grid, GridItem, Image, Stack, Text, Heading } from '@chakra-ui/react';

type NFTDisplayProps = {
  nfts: string[];
  isAuthenticated: boolean;
};

const NFTDisplay = ({ nfts, isAuthenticated }: NFTDisplayProps) => {
  return (
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
  );
};

export default NFTDisplay;
