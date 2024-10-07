// File: binance-trade-tracker/backend/src/server.ts

import app from './app'; // Import the app from app.ts

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});