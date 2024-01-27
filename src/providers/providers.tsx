'use client';

import { ChakraProvider } from '@chakra-ui/react';
import Web3ContextProvider from '@/contexts/web-3-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <Web3ContextProvider>
      {children}
      </Web3ContextProvider>
    </ChakraProvider>
  );
}