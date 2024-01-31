import React from 'react';

const BSC_TEST_CHAIN_ID = '0x61';

const FeedbackMessage = {
  correct: 'Connected to BSC Testnet',
  incorrect: 'Please connect to the BSC Testnet',
  error: 'Error checking network',
};

// Check user is connected to the BSC Testnet
const useCheckCorrectNetwork = (currentChain: number | null) => {
  const [isCorrectNetwork, setIsCorrectNetwork] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  React.useEffect(() => {
    const checkNetwork = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const { ethereum } = window as any;
          const chainId = await ethereum.request({ method: 'eth_chainId' }) as string;
        
          if (chainId !== BSC_TEST_CHAIN_ID) {
            setIsCorrectNetwork(false);
            setMessage(FeedbackMessage.incorrect);
          } else {
            setIsCorrectNetwork(true);
            setMessage(FeedbackMessage.correct);
          }
        } catch (error) {
          setIsCorrectNetwork(false);
          setMessage(FeedbackMessage.error + ': ' + error);
        }
      }
    };

    // Initial check
    checkNetwork();
  }, [currentChain]);

  return {isCorrectNetwork, message};
};

export default useCheckCorrectNetwork;
