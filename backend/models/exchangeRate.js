const mongoose = require('mongoose');

const exchangeRateSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  rate: { type: Number, required: true },
  fromCurrency: { type: String, required: true },
  toCurrency: { type: String, required: true },
});

const ExchangeRate = mongoose.model('ExchangeRate', exchangeRateSchema, 'exchangerates');

module.exports = ExchangeRate;
