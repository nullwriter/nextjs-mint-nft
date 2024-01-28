import Providers from '@/providers/providers';
import Header from './header';
import Footer from './footer';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="text-white bg-black">
      <Providers>
        <Header />
        {children}
        <Footer />
      </Providers>
    </div>
  );
}

export default RootLayout;