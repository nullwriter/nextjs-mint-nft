import Hero from '@/components/shared/hero';
import Meta from '@/components/shared/meta';
import MintNFT from '@/components/mint-box';

const Home = () => {
  return (
    <div>
      <Meta />
      <Hero />
      <section className="text-gray-600 body-font">
        <div className="container px-3 pb-24 pt-10 mx-auto flex justify-center flex-wrap">
          <MintNFT />
        </div>
      </section>
    </div>
  );
}

export default Home;