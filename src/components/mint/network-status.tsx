import React from 'react';
import { CardFooter } from '@chakra-ui/react';

type NetworkStatusProps = {
  isCorrectNetwork: boolean;
  message: string;
  address: string | null;
};

const NetworkStatus = ({ isCorrectNetwork, message, address }: NetworkStatusProps) => {
  return (
    <>
      {isCorrectNetwork ? (
        <div>
          <p className="text-green-500">{message}</p>
          {address && <p>Address: {address}</p>}
        </div>
      ) : (
        <p className="text-red-500">{message}</p>
      )}
    </>
  );
};

export default NetworkStatus;