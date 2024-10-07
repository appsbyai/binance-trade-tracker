import { Request, Response } from 'express';
import { fetchTrades, calculatePnLAndFees } from '../services/binanceService';

export const getTrades = async (req: Request, res: Response) => {
  try {
    const trades = await fetchTrades();
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trades', error });
  }
};

export const calculatePnL = async (req: Request, res: Response) => {
  try {
    const result = await calculatePnLAndFees();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error calculating PnL', error });
  }
};