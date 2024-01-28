import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import RootLayout from '@/components/layout/layout';
 
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default App;