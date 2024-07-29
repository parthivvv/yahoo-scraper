const yahooFinance = require('yahoo-finance2').default;
const ExchangeRate = require('../models/exchangeRate');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchYahooFinanceData(quote, fromDate, toDate) {
  console.log('Fetching data for:', quote);
  try {
    const result = await yahooFinance.historical(quote, { period1: fromDate, period2: toDate });
    const data = result.map(item => ({
      date: new Date(item.date),
      rate: item.close
    }));

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function scrapeAndStoreData(req, res) {
    const { quote, fromDate, toDate } = req.body;
  
    if (!quote || !fromDate || !toDate) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    if (new Date(fromDate) >= new Date(toDate)) {
      return res.status(400).json({ error: 'Invalid date range. "fromDate" must be earlier than "toDate".' });
    }
  
    try {
      await delay(2000);
      const fetchedData = await fetchYahooFinanceData(quote, new Date(fromDate), new Date(toDate));
  
      // Extract the fromCurrency and toCurrency from the quote
      const [fromCurrency, toCurrency] = quote.split('=')[0].match(/.{1,3}/g);
  
      // Store data in MongoDB
      const savedData = await Promise.all(
        fetchedData.map(async (item) => {
          const exchangeRate = new ExchangeRate({
            date: item.date,
            rate: item.rate,
            fromCurrency,
            toCurrency,
          });
          return await exchangeRate.save();
        })
      );
  
      res.json({ message: 'Data fetched and stored successfully', data: savedData });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  }
  

module.exports = {
  scrapeAndStoreData,
  fetchYahooFinanceData
};
