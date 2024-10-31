import React, { createContext, useContext, useState, useCallback } from 'react';
import type { WalletInfo } from '../types';

interface WalletContextType {
  wallet: WalletInfo;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletInfo>({
    address: '',
    balance: '0',
    isConnected: false,
  });

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest'],
        });

        setWallet({
          address: accounts[0],
          balance: (parseInt(balance, 16) / 1e18).toFixed(4),
          isConnected: true,
        });
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use this feature');
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWallet({
      address: '',
      balance: '0',
      isConnected: false,
    });
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};