const {
  calculateRiskReport,
  calculatePortfolioGrade
} = require("../js/riskEngine");


// riskEngine.js depends on these two functions.
// Make them available in the Node/Jest environment.
const {
  calculateAllocation,
  calculateSectorExposure
} = require("../js/portfolioService");

global.calculateAllocation = calculateAllocation;
global.calculateSectorExposure = calculateSectorExposure;


// 1. Test Grade A
test("returns grade A for a low risk score", () => {
  expect(calculatePortfolioGrade(0)).toBe("A");
  expect(calculatePortfolioGrade(2)).toBe("A");
});


// 2. Test Grade B
test("returns grade B for risk scores between 3 and 4", () => {
  expect(calculatePortfolioGrade(3)).toBe("B");
  expect(calculatePortfolioGrade(4)).toBe("B");
});


// 3. Test Grade C
test("returns grade C for risk scores between 5 and 6", () => {
  expect(calculatePortfolioGrade(5)).toBe("C");
  expect(calculatePortfolioGrade(6)).toBe("C");
});


// 4. Test Grade D
test("returns grade D for risk scores between 7 and 8", () => {
  expect(calculatePortfolioGrade(7)).toBe("D");
  expect(calculatePortfolioGrade(8)).toBe("D");
});


// 5. Test Grade F
test("returns grade F for risk scores above 8", () => {
  expect(calculatePortfolioGrade(9)).toBe("F");
  expect(calculatePortfolioGrade(10)).toBe("F");
});


// 6. Empty portfolio
test("returns zero risk for an empty portfolio", () => {
  const result = calculateRiskReport([]);

  expect(result.riskScore).toBe(0);
  expect(result.grade).toBe("A");
  expect(result.warnings).toHaveLength(0);
});


// 7. Weak diversification
test("adds diversification risk when portfolio has fewer than 3 holdings", () => {
  const holdings = [
    {
      symbol: "AAPL",
      sector: "Technology",
      shares: 1,
      price: 100
    },
    {
      symbol: "TD",
      sector: "Financials",
      shares: 1,
      price: 100
    }
  ];

  const result = calculateRiskReport(holdings);

  expect(result.warnings).toContain(
    "Portfolio diversification is weak."
  );
});


// 8. Position concentration
test("adds warning when a holding exceeds 40 percent", () => {
  const holdings = [
    {
      symbol: "AAPL",
      sector: "Technology",
      shares: 60,
      price: 10
    },
    {
      symbol: "TD",
      sector: "Financials",
      shares: 20,
      price: 10
    },
    {
      symbol: "JNJ",
      sector: "Healthcare",
      shares: 20,
      price: 10
    }
  ];

  const result = calculateRiskReport(holdings);

  expect(result.warnings).toContain(
    "AAPL exceeds 40% of your portfolio."
  );
});


// 9. Sector concentration
test("adds warning when sector exposure exceeds 70 percent", () => {
  const holdings = [
    {
      symbol: "AAPL",
      sector: "Technology",
      shares: 40,
      price: 10
    },
    {
      symbol: "MSFT",
      sector: "Technology",
      shares: 40,
      price: 10
    },
    {
      symbol: "TD",
      sector: "Financials",
      shares: 20,
      price: 10
    }
  ];

  const result = calculateRiskReport(holdings);

  expect(result.warnings).toContain(
    "Technology sector exposure exceeds 70%."
  );
});


// 10. Risk score cannot exceed 10
test("caps risk score at 10", () => {
  const holdings = [
    {
      symbol: "AAPL",
      sector: "Technology",
      shares: 100,
      price: 10
    }
  ];

  const result = calculateRiskReport(holdings);

  expect(result.riskScore).toBeLessThanOrEqual(10);
});