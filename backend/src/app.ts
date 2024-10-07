import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import tradeRoutes from './routes/tradeRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Binance Trade Tracker API is running');
});

app.use('/api/trades', tradeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});