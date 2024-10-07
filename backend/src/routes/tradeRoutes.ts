// File: binance-trade-tracker/backend/src/routes/trades.ts

import express from 'express';
import { BinanceService } from '../services/binanceService';

const router = express.Router();
const binanceService = new BinanceService();

router.get('/recent', async (req, res) => {
  try {
    const trades = await binanceService.getRecentTrades();
    res.json(trades);
  } catch (error) {
    console.error('Error in /recent route:', error);
    res.status(500).json({ error: 'Failed to fetch recent trades', details: error.message });
  }
});

// ... other routes

export default router;