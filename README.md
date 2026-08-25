# Portfolio Doctor

Portfolio Doctor is a full-stack investment portfolio risk analytics application that helps users analyze portfolio allocation, sector concentration, and investment risk using live stock market data.

## Live Demo

**Live Application:** https://portfolio-doctor-1.onrender.com/

## Features

- Add and manage stock holdings
- Retrieve live stock prices through a REST API
- Calculate total portfolio value and identify the largest position
- Analyze individual stock allocation
- Analyze sector exposure and concentration
- Generate portfolio risk scores, grades, and warnings
- Visualize portfolio allocation and sector exposure using Chart.js
- Persist portfolio data in the browser using LocalStorage
- Validate duplicate and invalid stock symbols
- Handle API and backend errors gracefully

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Chart.js

### Backend
- Node.js
- Express.js
- REST API

### Market Data
- Twelve Data API

### Development & Deployment
- Git
- GitHub
- Render

## Architecture

```text
User
  ↓
Browser
  ↓
Frontend (HTML / CSS / JavaScript)
  ↓
HTTP Request
  ↓
Express REST API
  ↓
Twelve Data API
  ↓
JSON Response
  ↓
Express Backend
  ↓
Frontend
  ↓
Portfolio Analytics
  ↓
Dynamic UI + Charts + Risk Report
```

The frontend never communicates directly with Twelve Data. Market-data requests are routed through the Express backend, keeping the external API key out of client-side code.

## How It Works

1. The user enters a stock symbol, sector, and number of shares.
2. The frontend validates and normalizes the user input.
3. The frontend sends an HTTP request to the Express backend.
4. The backend retrieves the Twelve Data API key from an environment variable.
5. The backend requests the current stock price from Twelve Data.
6. Twelve Data returns the market data to the backend.
7. The backend returns the result to the frontend as JSON.
8. The holding is added to the portfolio and stored using LocalStorage.
9. Portfolio analytics recalculate total value, allocation, sector exposure, and risk.
10. The dashboard, charts, and risk report update dynamically.

## Portfolio Analytics

Portfolio Doctor analyzes several dimensions of a portfolio:

- **Total Portfolio Value** — Calculates the combined market value of all holdings.
- **Largest Position** — Identifies the largest holding by market value.
- **Allocation Analysis** — Calculates each holding's percentage of the total portfolio.
- **Sector Exposure** — Aggregates holdings by sector to identify concentration.
- **Risk Analysis** — Generates a risk score, portfolio grade, and warnings based on portfolio composition.

## API Flow

For example, when a user adds AAPL:

```text
Browser
  ↓
GET /api/price?symbol=AAPL
  ↓
Express Backend
  ↓
Twelve Data
  ↓
{ "price": "..." }
  ↓
Express Backend
  ↓
Frontend
  ↓
Portfolio recalculation
  ↓
Updated dashboard
```

## Error Handling

The application handles:

- Missing stock symbols
- Invalid stock symbols
- Duplicate holdings
- External API failures
- Backend server errors

API credentials are stored as environment variables and are not exposed in frontend source code.

## Project Structure

```text
portfolio-doctor/
├── index.html
├── style.css
├── js/
│   ├── app.js
│   ├── stockService.js
│   ├── portfolioService.js
│   ├── riskEngine.js
│   ├── chartService.js
│   └── storage.js
│
└── server/
    ├── server.js
    ├── package.json
    └── package-lock.json
```

## Running Locally

### 1. Install backend dependencies

```bash
cd server
npm install
```

### 2. Configure the environment variable

Create a `.env` file inside the `server` directory:

```text
TWELVE_DATA_API_KEY=your_api_key
```

### 3. Start the backend

```bash
node server.js
```

The backend runs locally on:

```text
http://localhost:3000
```

### 4. Start the frontend

From the project root:

```bash
npx serve . -l 3001
```

Then open:

```text
http://localhost:3001
```

## Future Improvements

Potential future extensions include:

- Historical portfolio performance analysis
- Automated sector classification
- Portfolio volatility and additional quantitative risk metrics
- User authentication
- Cloud-based portfolio persistence