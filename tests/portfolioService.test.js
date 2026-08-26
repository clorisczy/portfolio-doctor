const {
  calculateHoldingValue,
  calculateTotalValue,
  calculateLargestPosition,
  calculateAllocation,
  calculateSectorExposure
} = require("../js/portfolioService");


// 1. Holding Value
test("calculates holding value correctly", () => {
  const holding = {
    symbol: "AAPL",
    sector: "Technology",
    shares: 10,
    price: 100
  };

  const result = calculateHoldingValue(holding);

  expect(result).toBe(1000);
});


// 2. Total Portfolio Value
test("calculates total portfolio value correctly", () => {
  const holdings = [
    {
      symbol: "AAPL",
      sector: "Technology",
      shares: 10,
      price: 100
    },
    {
      symbol: "MSFT",
      sector: "Technology",
      shares: 5,
      price: 200
    }
  ];

  const result = calculateTotalValue(holdings);

  expect(result).toBe(2000);
});


// 3. Largest Position
test("identifies the largest portfolio position correctly", () => {
  const holdings = [
    {
      symbol: "AAPL",
      sector: "Technology",
      shares: 10,
      price: 100
    },
    {
      symbol: "MSFT",
      sector: "Technology",
      shares: 20,
      price: 200
    },
    {
      symbol: "NVDA",
      sector: "Technology",
      shares: 5,
      price: 300
    }
  ];

  const result = calculateLargestPosition(holdings);

  expect(result.symbol).toBe("MSFT");
});


// 4. Empty Portfolio - Largest Position
test("returns null for largest position when portfolio is empty", () => {
  const holdings = [];

  const result = calculateLargestPosition(holdings);

  expect(result).toBeNull();
});


// 5. Allocation Calculation
test("calculates portfolio allocation correctly", () => {
  const holdings = [
    {
      symbol: "AAPL",
      sector: "Technology",
      shares: 10,
      price: 100
    },
    {
      symbol: "TD",
      sector: "Financials",
      shares: 10,
      price: 100
    }
  ];

  const result = calculateAllocation(holdings);

  expect(result[0].allocation).toBeCloseTo(50);
  expect(result[1].allocation).toBeCloseTo(50);
});


// 6. Allocation With Different Position Sizes
test("calculates different position allocations correctly", () => {
  const holdings = [
    {
      symbol: "AAPL",
      sector: "Technology",
      shares: 3,
      price: 100
    },
    {
      symbol: "TD",
      sector: "Financials",
      shares: 1,
      price: 100
    }
  ];

  const result = calculateAllocation(holdings);

  expect(result[0].allocation).toBeCloseTo(75);
  expect(result[1].allocation).toBeCloseTo(25);
});


// 7. Sector Exposure
test("calculates sector exposure correctly", () => {
  const holdings = [
    {
      symbol: "AAPL",
      sector: "Technology",
      shares: 10,
      price: 100
    },
    {
      symbol: "MSFT",
      sector: "Technology",
      shares: 10,
      price: 100
    },
    {
      symbol: "TD",
      sector: "Financials",
      shares: 20,
      price: 100
    }
  ];

  const result = calculateSectorExposure(holdings);

  const technology = result.find(
    (item) => item.sector === "Technology"
  );

  const financials = result.find(
    (item) => item.sector === "Financials"
  );

  expect(technology.allocation).toBeCloseTo(50);
  expect(financials.allocation).toBeCloseTo(50);
});


// 8. Empty Portfolio Total Value
test("returns zero total value for an empty portfolio", () => {
  const holdings = [];

  const result = calculateTotalValue(holdings);

  expect(result).toBe(0);
});