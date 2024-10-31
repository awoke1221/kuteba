import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Navbar from './components/Navbar';
import SwapInterface from './components/SwapInterface';
import PoolInterface from './components/PoolInterface';

function App() {
  return (
    <Router>
      <WalletProvider>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <div className="pt-24 pb-8 px-4">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-full max-w-lg mb-8">
                        <h1 className="text-4xl font-bold text-white text-center mb-2">
                          Trade tokens instantly
                        </h1>
                        <p className="text-gray-400 text-center">
                          Swap tokens with the most efficient decentralized exchange protocol
                        </p>
                      </div>
                      <SwapInterface />
                    </div>
                  }
                />
                <Route path="/pool" element={<PoolInterface />} />
              </Routes>
            </div>
          </div>
        </div>
      </WalletProvider>
    </Router>
  );
}

export default App;