import React, { useState } from 'react';
import { Settings, ArrowDownUp, Info } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import TokenModal from './TokenModal';
import SwapSettings from './SwapSettings';
import type { Token } from '../types';

interface TokenInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSelectToken: () => void;
  token?: Token;
  balance?: string;
}

const TokenInput: React.FC<TokenInputProps> = ({ 
  label, 
  value, 
  onChange, 
  onSelectToken, 
  token, 
  balance 
}) => (
  <div className="bg-gray-900 rounded-xl p-4">
    <div className="flex justify-between mb-2">
      <span className="text-gray-400">{label}</span>
      {balance && <span className="text-gray-400">Balance: {balance}</span>}
    </div>
    <div className="flex gap-2">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-2xl outline-none text-white"
        placeholder="0.0"
      />
      <button 
        onClick={onSelectToken}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2"
      >
        {token ? (
          <>
            <img src={token.logoURI} alt={token.symbol} className="w-5 h-5 rounded-full" />
            {token.symbol}
          </>
        ) : (
          'Select Token'
        )}
      </button>
    </div>
  </div>
);

const SwapInterface: React.FC = () => {
  const { wallet, connectWallet } = useWallet();
  const [tokenAAmount, setTokenAAmount] = useState('');
  const [tokenBAmount, setTokenBAmount] = useState('');
  const [tokenA, setTokenA] = useState<Token>();
  const [tokenB, setTokenB] = useState<Token>();
  const [isSelectingTokenA, setIsSelectingTokenA] = useState(false);
  const [isSelectingTokenB, setIsSelectingTokenB] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [slippage, setSlippage] = useState('0.5');
  const [deadline, setDeadline] = useState('20');

  const handleSwap = () => {
    if (!wallet.isConnected) {
      connectWallet();
      return;
    }
    console.log('Swap tokens', { 
      tokenA, 
      tokenB, 
      tokenAAmount, 
      tokenBAmount,
      slippage,
      deadline
    });
  };

  return (
    <>
      <div className="w-full max-w-lg bg-gray-800 rounded-2xl p-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Swap</h2>
          <button 
            className="text-gray-400 hover:text-white"
            onClick={() => setShowSettings(true)}
          >
            <Settings size={20} />
          </button>
        </div>

        <div className="space-y-2">
          <TokenInput
            label="You pay"
            value={tokenAAmount}
            onChange={setTokenAAmount}
            onSelectToken={() => setIsSelectingTokenA(true)}
            token={tokenA}
            balance={wallet.isConnected ? `${wallet.balance} ${tokenA?.symbol || ''}` : undefined}
          />

          <div className="flex justify-center -my-2 z-10">
            <button 
              className="bg-gray-700 p-2 rounded-xl hover:bg-gray-600"
              onClick={() => {
                const tempToken = tokenA;
                const tempAmount = tokenAAmount;
                setTokenA(tokenB);
                setTokenB(tempToken);
                setTokenAAmount(tokenBAmount);
                setTokenBAmount(tempAmount);
              }}
            >
              <ArrowDownUp size={20} className="text-blue-400" />
            </button>
          </div>

          <TokenInput
            label="You receive"
            value={tokenBAmount}
            onChange={setTokenBAmount}
            onSelectToken={() => setIsSelectingTokenB(true)}
            token={tokenB}
          />
        </div>

        <div className="mt-4 space-y-4">
          {tokenA && tokenB && (
            <div className="bg-gray-900/50 rounded-xl p-3">
              <div className="flex justify-between text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  Price <Info size={14} />
                </span>
                <span>1 {tokenA.symbol} = 3,245.43 {tokenB.symbol}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>Minimum received</span>
                <span>3,229.31 {tokenB.symbol}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>Price Impact</span>
                <span className="text-green-500">{'<'}0.01%</span>
              </div>
            </div>
          )}

          <button 
            onClick={handleSwap}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-colors"
          >
            {wallet.isConnected ? 'Swap' : 'Connect Wallet'}
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
      <SwapSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        slippage={slippage}
        setSlippage={setSlippage}
        deadline={deadline}
        setDeadline={setDeadline}
      />
    </>
  );
};

export default SwapInterface;