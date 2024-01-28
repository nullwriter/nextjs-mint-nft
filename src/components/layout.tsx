import { Providers } from '@/providers/providers';
import Header from './header';
import Footer from './footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
