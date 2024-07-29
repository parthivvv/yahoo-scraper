const express = require('express');
const { scrapeAndStoreData } = require('../controllers/exchangeController');

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     ScrapeData:
 *       type: object
 *       required:
 *         - quote
 *         - fromDate
 *         - toDate
 *       properties:
 *         quote:
 *           type: string
 *           description: The currency pair symbol (e.g., EURUSD=X)
 *           example: "EURUSD=X"
 *         fromDate:
 *           type: string
 *           format: date
 *           description: The start date for the data (YYYY-MM-DD)
 *           example: "2022-01-01"
 *         toDate:
 *           type: string
 *           format: date
 *           description: The end date for the data (YYYY-MM-DD)
 *           example: "2022-02-01"
 */

/**
 * @swagger
 * /api/scrape:
 *   post:
 *     summary: Scrape and store historical exchange data
 *     tags: [ScrapeData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScrapeData'
 *           examples:
 *             example1:
 *               summary: Example request body
 *               value:
 *                 quote: "EURUSD=X"
 *                 fromDate: "2022-01-01"
 *                 toDate: "2022-02-01"
 *     responses:
 *       200:
 *         description: Data scraped and stored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *                   example: "Data fetched and stored successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2022-01-03"
 *                       rate:
 *                         type: number
 *                         example: 1.135
 *                       fromCurrency:
 *                         type: string
 *                         example: "EUR"
 *                       toCurrency:
 *                         type: string
 *                         example: "USD"
 *       400:
 *         description: Missing required parameters or invalid date range
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required parameters"
 *       500:
 *         description: An error occurred while processing the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while processing the request"
 */
router.post('/scrape', scrapeAndStoreData);

module.exports = router;
