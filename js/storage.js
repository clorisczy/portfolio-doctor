function saveHoldings(holdings) {
  localStorage.setItem("holdings", JSON.stringify(holdings));
}

function loadHoldings() {
  const savedHoldings = localStorage.getItem("holdings");

  if (savedHoldings) {
    return JSON.parse(savedHoldings);
  }

  return [];
}
