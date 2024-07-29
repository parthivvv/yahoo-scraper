// cron/scraperCron.js
const cron = require('node-cron');
const { fetchYahooFinanceData } = require('../controllers/exchangeController');
const ExchangeRate = require('../models/exchangeRate');

const pairs = [
  { from: 'GBP', to: 'INR', periods: ['1W', '1M', '3M', '6M', '1Y'] },
  { from: 'AED', to: 'INR', periods: ['1W', '1M', '3M', '6M', '1Y'] }
];

const getDaysFromPeriod = (period) => {
  const periods = {
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
  };
  return periods[period.toUpperCase()] || 0;
};

const scrapeData = async () => {
  console.log('Starting scheduled data scrape...');
  for (const pair of pairs) {
    for (const period of pair.periods) {
      const days = getDaysFromPeriod(period);
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - days);

      try {
        const data = await fetchYahooFinanceData(`${pair.from}${pair.to}=X`, startDate, endDate);

        for (const item of data) {
          const exchangeRate = new ExchangeRate({
            date: item.date,
            rate: item.rate,
            fromCurrency: pair.from,
            toCurrency: pair.to,
          });
          await exchangeRate.save();
        }

        console.log(`Data scraped and saved for ${pair.from} to ${pair.to} for period ${period}`);
      } catch (error) {
        console.error(`Error scraping data for ${pair.from} to ${pair.to} for period ${period}:`, error);
      }
    }
  }
  console.log('Data scrape complete.');
};

// Schedule the job to run every day at midnight
cron.schedule('0 0 * * *', scrapeData);

module.exports = { scrapeData };
