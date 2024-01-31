import React from 'react';
import { useCheckCorrectNetwork } from '@/hooks';

type NetworkStatusProps = {
  currentChain: number | null;
};

const NetworkStatus = ({ currentChain }: NetworkStatusProps) => {
  const { isCorrectNetwork, message } = useCheckCorrectNetwork(currentChain);

  return (
    <p className={isCorrectNetwork ? "text-green-500" : "text-red-500"}>{message}</p>
  );
};

export default NetworkStatus;