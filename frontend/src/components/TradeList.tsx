// File: binance-trade-tracker/frontend/src/components/TradeList.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Trade {
  symbol: string;
  id: number;
  price: string;
  qty: string;
  time: number;
  isBuyer: boolean;
}

interface TradeListProps {
  onTradesFiltered: (trades: Trade[]) => void;
}

const TradeList: React.FC<TradeListProps> = ({ onTradesFiltered }) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');
  const [coins, setCoins] = useState<string[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get<Trade[]>('http://localhost:3001/api/trades/recent');
        setTrades(response.data);
        setFilteredTrades(response.data);
        const uniqueCoins = Array.from(new Set(response.data.map((trade: Trade) => trade.symbol)));
        setCoins(uniqueCoins);
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };

    fetchTrades();
  }, []);

  useEffect(() => {
    filterTrades();
  }, [startDate, endDate, selectedCoin, trades]);

  const filterTrades = () => {
    let filtered = trades;

    if (startDate) {
      filtered = filtered.filter(trade => new Date(trade.time) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(trade => new Date(trade.time) <= new Date(endDate));
    }

    if (selectedCoin) {
      filtered = filtered.filter(trade => trade.symbol === selectedCoin);
    }

    setFilteredTrades(filtered);
    onTradesFiltered(filtered);
  };

  return (
    <div>
      <h2>Recent Trades</h2>
      <div className="filters">
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <label>
          Coin:
          <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}>
            <option value="">All</option>
            {coins.map(coin => (
              <option key={coin} value={coin}>{coin}</option>
            ))}
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Time</th>
            <th>Side</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrades.map((trade) => (
            <tr key={trade.id}>
              <td>{trade.symbol}</td>
              <td>{trade.price}</td>
              <td>{trade.qty}</td>
              <td>{new Date(trade.time).toLocaleString()}</td>
              <td>{trade.isBuyer ? 'Buy' : 'Sell'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeList;