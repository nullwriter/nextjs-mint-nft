import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NFTDisplay from './nft-display';

describe('NFTDisplay', () => {
  it('renders NFTs when user is authenticated and has NFTs', () => {
    const nfts = ['nft1', 'nft2', 'nft3'];
    render(<NFTDisplay nfts={nfts} isAuthenticated={true} />);

    nfts.forEach((nft, i) => {
      expect(screen.getByAltText(`nft${i+1}`)).toBeDefined();
    });
  });

  // it('renders message when user is authenticated and has no NFTs', () => {
  //   render(<NFTDisplay nfts={[]} isAuthenticated={true} />);
  //   expect(screen.getByText('You have no TCBT yet')).toBeInTheDocument();
  // });

  // it('renders message when user is not authenticated', () => {
  //   render(<NFTDisplay nfts={[]} isAuthenticated={false} />);
  //   expect(screen.getByText('Please connect your wallet to see your TCBT')).toBeInTheDocument();
  // });
});