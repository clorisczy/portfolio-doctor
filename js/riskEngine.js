function calculateRiskReport(holdings) {
  let riskScore = 0;
  const warnings = [];

  const allocations = calculateAllocation(holdings);
  const sectorExposures = calculateSectorExposure(holdings);

  allocations.forEach((item) => {
    if (item.allocation > 40) {
      riskScore += 3;
      warnings.push(`${item.symbol} exceeds 40% of your portfolio.`);
    }
  });

  sectorExposures.forEach((item) => {
    if (item.allocation > 70) {
      riskScore += 3;
      warnings.push(`${item.sector} sector exposure exceeds 70%.`);
    }
  });

  if (holdings.length < 3 && holdings.length > 0) {
    riskScore += 2;
    warnings.push("Portfolio diversification is weak.");
  }

  if (riskScore > 10) {
    riskScore = 10;
  }

  return {
    riskScore: riskScore,
    grade: calculatePortfolioGrade(riskScore),
    warnings: warnings
  };
}

function calculatePortfolioGrade(riskScore) {
  if (riskScore <= 2) {
    return "A";
  } else if (riskScore <= 4) {
    return "B";
  } else if (riskScore <= 6) {
    return "C";
  } else if (riskScore <= 8) {
    return "D";
  } else {
    return "F";
  }
}
