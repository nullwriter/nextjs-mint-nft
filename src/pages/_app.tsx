import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from "@chakra-ui/react";
import Web3ContextProvider from '@/contexts/web-3-context';
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </ChakraProvider>
  );
}