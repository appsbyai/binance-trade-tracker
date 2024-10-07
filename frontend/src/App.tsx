// File: binance-trade-tracker/frontend/src/App.tsx

import React, { useState } from 'react';
import TradeList from './components/TradeList';
import PnLCalculator from './components/PnLCalculator';
import './styles.css';

interface Trade {
  symbol: string;
  id: number;
  price: string;
  qty: string;
  time: number;
  isBuyer: boolean;
}

const App: React.FC = () => {
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);

  return (
    <div className="App">
      <h1>Binance Trade Tracker</h1>
      <TradeList onTradesFiltered={setFilteredTrades} />
      <PnLCalculator trades={filteredTrades} />
    </div>
  );
};

export default App;