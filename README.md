This is a [Next.js](https://nextjs.org/) project using Ether.js to mint ERC721 NFTs. It features the ability to pay with different ERC20 tokens.

## Getting Started

#### Set up configs

In `utils/contract.ts` you will need to set the following:

- `ERC721_CONTRACT_ADDRESS`: the main contract
- `BUSD_CONTRACT_ADDRESS`: ERC20 contract to use (currently set as BUSD)
- `URI_BASE`: url base where NFT assets are hosted
- `ERC721ABI`: contract ABI
- `ERC20ABI`: contract ABI
- `MINT_PRICE`: mint price for accepted tokens
- `CRYPTO`: accepted tokens

#### Update site metadata

Change `utils/seo.ts` to fit your site information

## Build project

Run the development server:

```bash

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Build project:

```bash
npm run build
```
