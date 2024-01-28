import Hero from '@/components/hero';
import WalletConnectButton from '@/components/wallet-connect-button';

export default function Home() {
  return (
    <div>
      <Hero />
      <WalletConnectButton />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            Left
          </div>
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            Right
          </div>
        </div>
      </section>
    </div>
  );
}