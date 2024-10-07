// File: binance-trade-tracker/backend/src/services/binanceService.ts

import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://api.binance.com';

export interface Trade {
  symbol: string;
  id: number;
  orderId: number;
  price: string;
  qty: string;
  quoteQty: string;
  commission: string;
  commissionAsset: string;
  time: number;
  isBuyer: boolean;
  isMaker: boolean;
  isBestMatch: boolean;
}

export class BinanceService {
  private apiKey: string;
  private apiSecret: string;

  constructor() {
    this.apiKey = process.env.BINANCE_API_KEY || '';
    this.apiSecret = process.env.BINANCE_API_SECRET || '';
    
    if (!this.apiKey || !this.apiSecret) {
      throw new Error('Binance API key or secret is missing in the environment variables.');
    }
  }

  private sign(queryString: string): string {
    return crypto
      .createHmac('sha256', this.apiSecret)
      .update(queryString)
      .digest('hex');
  }

  async getRecentTrades(): Promise<Trade[]> {
    const endpoint = '/api/v3/myTrades';
    const timestamp = Date.now();
    const queryString = `timestamp=${timestamp}`;
    const signature = this.sign(queryString);

    try {
      const response = await axios.get(`${BASE_URL}${endpoint}?${queryString}&signature=${signature}`, {
        headers: {
          'X-MBX-APIKEY': this.apiKey,
        },
      });
      console.log('Binance API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching trades from Binance:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  calculatePnLAndFees(trades: Trade[]): { totalPnL: number; totalFees: number } {
    let totalPnL = 0;
    let totalFees = 0;

    trades.forEach((trade) => {
      const tradeValue = parseFloat(trade.price) * parseFloat(trade.qty);
      totalPnL += trade.isBuyer ? -tradeValue : tradeValue;
      totalFees += parseFloat(trade.commission);
    });

    return { totalPnL, totalFees };
  }
}