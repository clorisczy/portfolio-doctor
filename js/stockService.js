// Frontend - Backend
async function getStockPrice(symbol) {
  const url =
    `http://localhost:3000/api/price?symbol=${symbol}`;

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return Number(data.price);
}