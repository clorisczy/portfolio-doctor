function calculateHoldingValue(holding) {
  return holding.shares * holding.price;
}

function calculateTotalValue(holdings) {
  let total = 0;

  holdings.forEach((holding) => {
    total += calculateHoldingValue(holding);
  });

  return total;
}

function calculateLargestPosition(holdings) {
  if (holdings.length === 0) {
    return null;
  }

  let largest = holdings[0];

  holdings.forEach((holding) => {
    if (calculateHoldingValue(holding) > calculateHoldingValue(largest)) {
      largest = holding;
    }
  });

  return largest;
}

function calculateAllocation(holdings) {
  const totalValue = calculateTotalValue(holdings);

  if (totalValue === 0) {
    return [];
  }

  return holdings.map((holding) => {
    const value = calculateHoldingValue(holding);

    return {
      symbol: holding.symbol,
      value: value,
      allocation: (value / totalValue) * 100
    };
  });
}

function calculateSectorExposure(holdings) {
  const totalValue = calculateTotalValue(holdings);

  if (totalValue === 0) {
    return [];
  }

  const sectorTotals = {};

  holdings.forEach((holding) => {
    const sector = holding.sector;
    const value = calculateHoldingValue(holding);

    if (!sectorTotals[sector]) {
      sectorTotals[sector] = 0;
    }

    sectorTotals[sector] += value;
  });

  return Object.keys(sectorTotals).map((sector) => {
    return {
      sector: sector,
      value: sectorTotals[sector],
      allocation: (sectorTotals[sector] / totalValue) * 100
    };
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    calculateHoldingValue,
    calculateTotalValue,
    calculateLargestPosition,
    calculateAllocation,
    calculateSectorExposure
  };
}



