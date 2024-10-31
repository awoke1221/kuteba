import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Menu, LogOut } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const Navbar: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const location = useLocation();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-blue-500 text-xl font-bold">DEX Platform</Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/') ? 'text-white' : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  Swap
                </Link>
                <Link
                  to="/pool"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/pool') ? 'text-white' : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  Pool
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {wallet.isConnected ? (
              <>
                <div className="hidden md:block">
                  <div className="text-gray-300 text-sm">
                    Balance: {wallet.balance} ETH
                  </div>
                  <div className="text-gray-400 text-sm">
                    {formatAddress(wallet.address)}
                  </div>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline">Disconnect</span>
                </button>
              </>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <Wallet size={18} />
                <span>Connect Wallet</span>
              </button>
            )}
            <button className="md:hidden ml-4 text-gray-400 hover:text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;