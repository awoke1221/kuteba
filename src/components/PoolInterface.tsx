import React, { useState } from 'react';
import { Plus, Info, ChevronDown } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import TokenModal from './TokenModal';
import type { Token } from '../types';

interface PoolPosition {
  tokenA: Token;
  tokenB: Token;
  fee: number;
  liquidity: string;
  range: {
    min: string;
    max: string;
  };
}

const FEE_TIERS = [
  { value: 100, label: '0.01%', description: 'Best for stable pairs' },
  { value: 500, label: '0.05%', description: 'Best for stable pairs' },
  { value: 3000, label: '0.3%', description: 'Best for most pairs' },
  { value: 10000, label: '1%', description: 'Best for exotic pairs' },
];

const PoolInterface: React.FC = () => {
  const { wallet } = useWallet();
  const [isSelectingTokenA, setIsSelectingTokenA] = useState(false);
  const [isSelectingTokenB, setIsSelectingTokenB] = useState(false);
  const [tokenA, setTokenA] = useState<Token>();
  const [tokenB, setTokenB] = useState<Token>();
  const [selectedFee, setSelectedFee] = useState(3000);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [amount, setAmount] = useState('');

  const handleCreatePool = () => {
    if (!wallet.isConnected) return;
    console.log('Create pool', {
      tokenA,
      tokenB,
      fee: selectedFee,
      priceRange,
      amount,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Add Liquidity</h2>
          <button className="text-gray-400 hover:text-white">
            <Info size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Token Selection */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Select Pair</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsSelectingTokenA(true)}
                className="bg-gray-700 hover:bg-gray-600 rounded-xl p-3 flex items-center justify-center gap-2"
              >
                {tokenA ? (
                  <>
                    <img src={tokenA.logoURI} alt={tokenA.symbol} className="w-6 h-6 rounded-full" />
                    <span className="text-white">{tokenA.symbol}</span>
                  </>
                ) : (
                  <span className="text-white">Select token</span>
                )}
                <ChevronDown size={20} className="text-gray-400" />
              </button>
              <button
                onClick={() => setIsSelectingTokenB(true)}
                className="bg-gray-700 hover:bg-gray-600 rounded-xl p-3 flex items-center justify-center gap-2"
              >
                {tokenB ? (
                  <>
                    <img src={tokenB.logoURI} alt={tokenB.symbol} className="w-6 h-6 rounded-full" />
                    <span className="text-white">{tokenB.symbol}</span>
                  </>
                ) : (
                  <span className="text-white">Select token</span>
                )}
                <ChevronDown size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Fee Tier Selection */}
          <div>
            <span className="text-gray-400 block mb-2">Fee tier</span>
            <div className="grid grid-cols-2 gap-2">
              {FEE_TIERS.map((fee) => (
                <button
                  key={fee.value}
                  onClick={() => setSelectedFee(fee.value)}
                  className={`p-3 rounded-xl text-left ${
                    selectedFee === fee.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-medium">{fee.label}</div>
                  <div className="text-sm text-gray-400">{fee.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <span className="text-gray-400 block mb-2">Set Price Range</span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Min Price</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Max Price</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="∞"
                />
              </div>
            </div>
          </div>

          {/* Deposit Amount */}
          <div>
            <span className="text-gray-400 block mb-2">Deposit Amount</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <button
            onClick={handleCreatePool}
            disabled={!wallet.isConnected}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-4 rounded-xl font-bold text-lg transition-colors"
          >
            {wallet.isConnected ? 'Add Liquidity' : 'Connect Wallet'}
          </button>
        </div>
      </div>

      <TokenModal
        isOpen={isSelectingTokenA}
        onClose={() => setIsSelectingTokenA(false)}
        onSelect={setTokenA}
      />
      <TokenModal
        isOpen={isSelectingTokenB}
        onClose={() => setIsSelectingTokenB(false)}
        onSelect={setTokenB}
      />
    </div>
  );
};

export default PoolInterface;