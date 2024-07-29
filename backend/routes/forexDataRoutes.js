// routes/forexDataRoutes.js
const express = require('express');
const router = express.Router();
const ExchangeRate = require('../models/exchangeRate');

// Utility function to calculate the date range based on the period string
const calculateDateRange = (period) => {
  const periods = {
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
  };
  const days = periods[period.toUpperCase()] || 0;
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);
  return { startDate, endDate };
};

// Endpoint to fetch forex data
router.post('/forex-data', async (req, res) => {
  const { from, to, period } = req.body;

  if (!from || !to || !period) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const { startDate, endDate } = calculateDateRange(period);

  try {
    const data = await ExchangeRate.find({
      fromCurrency: from.toUpperCase(),
      toCurrency: to.toUpperCase(),
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: 1 });

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found for the given period.' });
    }

    res.json({ data });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching the data' });
  }
});

module.exports = router;

