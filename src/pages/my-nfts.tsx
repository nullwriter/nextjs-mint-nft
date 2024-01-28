import Meta from '@/components/shared/meta';
import MintNFT from '@/components/shared/mint-nft';

const MyNFTs = () => {
  return (
    <div>
      <Meta title="My NFTs" />
      <section className="body-font">
        <div className="container px-5 py-24 mx-auto flex justify-center flex-wrap">
          <MintNFT />
        </div>
      </section>
    </div>
  );
};

export default MyNFTs;