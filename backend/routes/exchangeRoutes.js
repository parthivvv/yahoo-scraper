const express = require('express');
const { scrapeAndStoreData } = require('../controllers/exchangeController');

const router = express.Router();

router.post('/scrape', scrapeAndStoreData);

module.exports = router;
