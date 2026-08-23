let holdings = loadHoldings();

const holdingForm = document.getElementById("holdingForm");

holdingForm.addEventListener("submit", addHolding);


async function addHolding(event) {
  event.preventDefault();

  const symbolInput = document.getElementById("symbolInput");
  const symbolError = document.getElementById("symbolError");

  // Clear old error message
  symbolError.textContent = "";

  const symbol = symbolInput
    .value
    .trim()
    .toUpperCase();

  const sectorInput = document
    .getElementById("sectorInput")
    .value
    .trim()
    .toLowerCase();

  const sector =
    sectorInput.charAt(0).toUpperCase() +
    sectorInput.slice(1);

  const shares = Number(
    document.getElementById("sharesInput").value
  );

  // Check duplicate symbol
  const existingHolding = holdings.find((holding) => {
    return holding.symbol === symbol;
  });

  if (existingHolding) {
    symbolError.textContent = "This symbol already exists.";
    return;
  }

  // Get current stock price
  let price;

  try {
    price = await getStockPrice(symbol);
  } catch (error) {
    symbolError.textContent = error.message;
    return;
  }

  const holding = {
    symbol,
    sector,
    shares,
    price
  };

  holdings.push(holding);
  saveHoldings(holdings);

  holdingForm.reset();

  renderApp();
}


function renderHoldings() {
  const tableBody =
    document.getElementById("holdingsTableBody");

  tableBody.innerHTML = "";

  holdings.forEach((holding, index) => {
    const row = `
      <tr>
        <td>${holding.symbol}</td>
        <td>${holding.sector}</td>
        <td>${holding.shares}</td>
        <td>$${holding.price}</td>
        <td>$${holding.shares * holding.price}</td>
        <td>
          <button onclick="deleteHolding(${index})">
            Delete
          </button>
        </td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });
}


function deleteHolding(index) {
  holdings.splice(index, 1);

  saveHoldings(holdings);

  renderApp();
}


function updateSummary() {
  const totalValue =
    calculateTotalValue(holdings);

  const largest =
    calculateLargestPosition(holdings);


  document.getElementById("totalValue").textContent =
    totalValue.toFixed(2);


  document.getElementById("holdingCount").textContent =
    holdings.length;


  document.getElementById("largestPosition").textContent =
    largest ? largest.symbol : "N/A";
}


function renderAllocation() {
  const allocationList =
    document.getElementById("allocationList");

  allocationList.innerHTML = "";


  const allocations =
    calculateAllocation(holdings);


  allocations.forEach((item) => {
    allocationList.innerHTML += `
      <li>
        ${item.symbol}
        -
        ${item.allocation.toFixed(2)}%
      </li>
    `;
  });
}


function renderSectorExposure() {
  const sectorExposureList =
    document.getElementById("sectorExposureList");

  sectorExposureList.innerHTML = "";


  const sectorExposures =
    calculateSectorExposure(holdings);


  sectorExposures.forEach((item) => {
    sectorExposureList.innerHTML += `
      <li>
        ${item.sector}
        -
        ${item.allocation.toFixed(2)}%
      </li>
    `;
  });
}


function renderRiskReport() {
  const riskReport =
    calculateRiskReport(holdings);


  document.getElementById("riskScore").textContent =
    riskReport.riskScore;


  document.getElementById("portfolioGrade").textContent =
    riskReport.grade;


  const riskWarnings =
    document.getElementById("riskWarnings");

  riskWarnings.innerHTML = "";


  if (riskReport.warnings.length === 0) {
    riskWarnings.innerHTML =
      "<p>No warnings.</p>";
  } 
  else {
    riskReport.warnings.forEach((warning) => {
      riskWarnings.innerHTML += `
        <p>${warning}</p>
      `;
    });
  }
}


function renderApp() {
  renderHoldings();

  updateSummary();

  renderAllocation();

  renderSectorExposure();

  renderRiskReport();

  renderAllocationChart(holdings);

  renderSectorChart(holdings);
}


renderApp();