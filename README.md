# Binance Trade Tracker

This project consists of a React frontend and an Express backend to track and analyze Binance trades.

## Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

## Setup

1. Clone the repository
2. Install dependencies for both frontend and backend:

   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Set up environment variables:
   - In the `backend/.env` file, add your Binance API key and secret:

     ```plaintext
     PORT=3001
     BINANCE_API_KEY=your_binance_api_key_here
     BINANCE_API_SECRET=your_binance_api_secret_here
     ```

## Running the application

1. Start the backend:

   ```bash
   cd backend
   npm run dev
   ```

   The backend will run on <http://localhost:3001>

2. In a new terminal, start the frontend:

   ```bash
   cd frontend
   npm start
   ```

   The frontend will run on <http://localhost:3000>

3. Open your browser and navigate to <http://localhost:3000> to use the application.

## Features

- View a list of your recent Binance trades
- Calculate total Profit and Loss (PnL) and fees

## Technologies Used

- Frontend: React, TypeScript, Axios
- Backend: Node.js, Express, TypeScript
- API: Binance API

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
