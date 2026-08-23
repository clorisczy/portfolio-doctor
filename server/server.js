require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Portfolio Doctor API is running.");
});

app.get("/api/price", async(req, res) => {
  const symbol = req.query.symbol;

  if (!symbol) {
    return res.status(400).json({
      error: "Symbol is required."
    });
  }
  const apiKey = process.env.TWELVE_DATA_API_KEY;

  const url =
    `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "error") {
      return res.status(404).json({
        error: "Stock symbol not found."
      });
    }

    res.json(data);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to retrieve stock price."
    });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

