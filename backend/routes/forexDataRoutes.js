// routes/forexDataRoutes.js
const express = require('express');
const router = express.Router();
const ExchangeRate = require('../models/exchangeRate');

/**
 * @swagger
 * components:
 *   schemas:
 *     ForexData:
 *       type: object
 *       required:
 *         - from
 *         - to
 *         - period
 *       properties:
 *         from:
 *           type: string
 *           description: The from currency code (e.g., GBP, AED)
 *           example: "GBP"
 *         to:
 *           type: string
 *           description: The to currency code (e.g., INR)
 *           example: "INR"
 *         period:
 *           type: string
 *           description: The timeframe for which you want to query data
 *           example: "1M"
 */

/**
 * @swagger
 * /api/forex-data:
 *   post:
 *     summary: Fetch historical forex data for a specific period
 *     tags: [ForexData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForexData'
 *           examples:
 *             example1:
 *               summary: Example request body
 *               value:
 *                 from: "GBP"
 *                 to: "INR"
 *                 period: "1M"
 *     responses:
 *       200:
 *         description: Historical forex data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2022-01-15"
 *                       rate:
 *                         type: number
 *                         example: 101.35
 *                       fromCurrency:
 *                         type: string
 *                         example: "GBP"
 *                       toCurrency:
 *                         type: string
 *                         example: "INR"
 *       400:
 *         description: Missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required parameters"
 *       404:
 *         description: No data found for the given period
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No data found for the given period."
 *       500:
 *         description: An error occurred while fetching the data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while fetching the data"
 */
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

