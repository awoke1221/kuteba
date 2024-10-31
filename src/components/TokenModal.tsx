import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import type { Token } from '../types';

const POPULAR_TOKENS: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
  },
];

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
}

const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredTokens = POPULAR_TOKENS.filter(
    token => 
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-800 rounded-2xl w-full max-w-md p-4 m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Select Token</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search token by name or paste address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 text-white rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredTokens.map((token) => (
            <button
              key={token.address}
              onClick={() => {
                onSelect(token);
                onClose();
              }}
              className="w-full flex items-center p-3 hover:bg-gray-700 rounded-xl transition-colors"
            >
              <img src={token.logoURI} alt={token.name} className="w-8 h-8 rounded-full" />
              <div className="ml-3 text-left">
                <div className="text-white font-medium">{token.symbol}</div>
                <div className="text-gray-400 text-sm">{token.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenModal;