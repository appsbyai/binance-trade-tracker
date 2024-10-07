// File: binance-trade-tracker/frontend/src/components/PnLCalculator.tsx

import React from 'react';

interface Trade {
  symbol: string;
  id: number;
  price: string;
  qty: string;
  time: number;
  isBuyer: boolean;
}

interface PnLCalculatorProps {
  trades: Trade[];
}

const PnLCalculator: React.FC<PnLCalculatorProps> = ({ trades }) => {
  const calculatePnL = () => {
    let totalPnL = 0;
    let totalFees = 0; // Assuming a fixed fee rate for simplicity

    trades.forEach((trade) => {
      const tradeValue = parseFloat(trade.price) * parseFloat(trade.qty);
      if (trade.isBuyer) {
        totalPnL -= tradeValue;
      } else {
        totalPnL += tradeValue;
      }
      totalFees += tradeValue * 0.001; // Assuming 0.1% fee
    });

    return { totalPnL, totalFees };
  };

  const { totalPnL, totalFees } = calculatePnL();

  return (
    <div>
      <h2>Profit and Loss Summary</h2>
      <p>Total PnL: ${totalPnL.toFixed(2)}</p>
      <p>Total Fees: ${totalFees.toFixed(2)}</p>
      <p>Net PnL: ${(totalPnL - totalFees).toFixed(2)}</p>
    </div>
  );
};

export default PnLCalculator;