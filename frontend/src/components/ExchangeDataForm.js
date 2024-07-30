import React, { useState } from 'react';
import '../styles/ExchangeDataForm.css';
import axios from 'axios';
import { useResultsContext } from './ResultsContext';

const ExchangeDataForm = () => {
  const [quote, setQuote] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [period, setPeriod] = useState('');
  const { setResults } = useResultsContext();
  const [loading, setLoading] = useState(false);

  const periods = [
    { label: '1 Week', value: '1W' },
    { label: '1 Month', value: '1M' },
    { label: '3 Months', value: '3M' },
    { label: '6 Months', value: '6M' },
    { label: '1 Year', value: '1Y' },
  ];

  const handleScrapeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://yahoo-scraper.onrender.com/api/scrape', {
        quote,
        fromDate,
        toDate,
      });
      setResults(response.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://yahoo-scraper.onrender.com/api/forex-data', {
        from: fromCurrency,
        to: toCurrency,
        period,
      });
      setResults(response.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exchange-forms">
      <form className="exchange-form" onSubmit={handleScrapeSubmit}>
        <h3>Scrape New Data</h3>
        <input
          type="text"
          placeholder="Currency Pair (e.g., EURUSD=X)"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          required
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Scrape Data'}
        </button>
      </form>

      <form className="exchange-form" onSubmit={handleQuerySubmit}>
        <h3>Fetch Stored Data</h3>
        <select
  value={fromCurrency}
  onChange={(e) => setFromCurrency(e.target.value)}
  required
>
  <option value="">Select From Currency</option>
  <option value="USD">USD - United States Dollar</option>
  <option value="EUR">EUR - Euro</option>
  <option value="JPY">JPY - Japanese Yen</option>
  <option value="GBP">GBP - British Pound</option>
  <option value="AUD">AUD - Australian Dollar</option>
  <option value="CAD">CAD - Canadian Dollar</option>
  <option value="CHF">CHF - Swiss Franc</option>
  <option value="CNY">CNY - Chinese Yuan</option>
  <option value="SEK">SEK - Swedish Krona</option>
  <option value="NZD">NZD - New Zealand Dollar</option>
  <option value="MXN">MXN - Mexican Peso</option>
  <option value="SGD">SGD - Singapore Dollar</option>
  <option value="HKD">HKD - Hong Kong Dollar</option>
  <option value="NOK">NOK - Norwegian Krone</option>
  <option value="KRW">KRW - South Korean Won</option>
  <option value="TRY">TRY - Turkish Lira</option>
  <option value="RUB">RUB - Russian Ruble</option>
  <option value="INR">INR - Indian Rupee</option>
  <option value="BRL">BRL - Brazilian Real</option>
  <option value="ZAR">ZAR - South African Rand</option>
  <option value="DKK">DKK - Danish Krone</option>
  <option value="PLN">PLN - Polish Zloty</option>
  <option value="TWD">TWD - New Taiwan Dollar</option>
  <option value="THB">THB - Thai Baht</option>
  <option value="MYR">MYR - Malaysian Ringgit</option>
  <option value="IDR">IDR - Indonesian Rupiah</option>
  <option value="CZK">CZK - Czech Koruna</option>
  <option value="AED">AED - United Arab Emirates Dirham</option>
  <option value="ILS">ILS - Israeli Shekel</option>
  <option value="CLP">CLP - Chilean Peso</option>
  <option value="PHP">PHP - Philippine Peso</option>
  <option value="PKR">PKR - Pakistani Rupee</option>
  <option value="HUF">HUF - Hungarian Forint</option>
  <option value="COP">COP - Colombian Peso</option>
  <option value="SAR">SAR - Saudi Riyal</option>
  <option value="QAR">QAR - Qatari Riyal</option>
  <option value="KWD">KWD - Kuwaiti Dinar</option>
  <option value="BHD">BHD - Bahraini Dinar</option>
  <option value="OMR">OMR - Omani Rial</option>
  <option value="VND">VND - Vietnamese Dong</option>
  <option value="NGN">NGN - Nigerian Naira</option>
  <option value="ARS">ARS - Argentine Peso</option>
  <option value="BDT">BDT - Bangladeshi Taka</option>
  <option value="EGP">EGP - Egyptian Pound</option>
  <option value="KZT">KZT - Kazakhstani Tenge</option>
  <option value="KES">KES - Kenyan Shilling</option>
  <option value="LKR">LKR - Sri Lankan Rupee</option>
  <option value="MMK">MMK - Myanmar Kyat</option>
  <option value="NPR">NPR - Nepalese Rupee</option>
  <option value="UAH">UAH - Ukrainian Hryvnia</option>
  <option value="BGN">BGN - Bulgarian Lev</option>
  <option value="HRK">HRK - Croatian Kuna</option>
  <option value="RON">RON - Romanian Leu</option>
  <option value="ISK">ISK - Icelandic Krona</option>
  <option value="JMD">JMD - Jamaican Dollar</option>
  <option value="DZD">DZD - Algerian Dinar</option>
  <option value="MAD">MAD - Moroccan Dirham</option>
  <option value="PEN">PEN - Peruvian Sol</option>
</select>

<select
  value={toCurrency}
  onChange={(e) => setToCurrency(e.target.value)}
  required
>
  <option value="">Select To Currency</option>
  <option value="USD">USD - United States Dollar</option>
  <option value="EUR">EUR - Euro</option>
  <option value="JPY">JPY - Japanese Yen</option>
  <option value="GBP">GBP - British Pound</option>
  <option value="AUD">AUD - Australian Dollar</option>
  <option value="CAD">CAD - Canadian Dollar</option>
  <option value="CHF">CHF - Swiss Franc</option>
  <option value="CNY">CNY - Chinese Yuan</option>
  <option value="SEK">SEK - Swedish Krona</option>
  <option value="NZD">NZD - New Zealand Dollar</option>
  <option value="MXN">MXN - Mexican Peso</option>
  <option value="SGD">SGD - Singapore Dollar</option>
  <option value="HKD">HKD - Hong Kong Dollar</option>
  <option value="NOK">NOK - Norwegian Krone</option>
  <option value="KRW">KRW - South Korean Won</option>
  <option value="TRY">TRY - Turkish Lira</option>
  <option value="RUB">RUB - Russian Ruble</option>
  <option value="INR">INR - Indian Rupee</option>
  <option value="BRL">BRL - Brazilian Real</option>
  <option value="ZAR">ZAR - South African Rand</option>
  <option value="DKK">DKK - Danish Krone</option>
  <option value="PLN">PLN - Polish Zloty</option>
  <option value="TWD">TWD - New Taiwan Dollar</option>
  <option value="THB">THB - Thai Baht</option>
  <option value="MYR">MYR - Malaysian Ringgit</option>
  <option value="IDR">IDR - Indonesian Rupiah</option>
  <option value="CZK">CZK - Czech Koruna</option>
  <option value="AED">AED - United Arab Emirates Dirham</option>
  <option value="ILS">ILS - Israeli Shekel</option>
  <option value="CLP">CLP - Chilean Peso</option>
  <option value="PHP">PHP - Philippine Peso</option>
  <option value="PKR">PKR - Pakistani Rupee</option>
  <option value="HUF">HUF - Hungarian Forint</option>
  <option value="COP">COP - Colombian Peso</option>
  <option value="SAR">SAR - Saudi Riyal</option>
  <option value="QAR">QAR - Qatari Riyal</option>
  <option value="KWD">KWD - Kuwaiti Dinar</option>
  <option value="BHD">BHD - Bahraini Dinar</option>
  <option value="OMR">OMR - Omani Rial</option>
  <option value="VND">VND - Vietnamese Dong</option>
  <option value="NGN">NGN - Nigerian Naira</option>
  <option value="ARS">ARS - Argentine Peso</option>
  <option value="BDT">BDT - Bangladeshi Taka</option>
  <option value="EGP">EGP - Egyptian Pound</option>
  <option value="KZT">KZT - Kazakhstani Tenge</option>
  <option value="KES">KES - Kenyan Shilling</option>
  <option value="LKR">LKR - Sri Lankan Rupee</option>
  <option value="MMK">MMK - Myanmar Kyat</option>
  <option value="NPR">NPR - Nepalese Rupee</option>
  <option value="UAH">UAH - Ukrainian Hryvnia</option>
  <option value="BGN">BGN - Bulgarian Lev</option>
  <option value="HRK">HRK - Croatian Kuna</option>
  <option value="RON">RON - Romanian Leu</option>
  <option value="ISK">ISK - Icelandic Krona</option>
  <option value="JMD">JMD - Jamaican Dollar</option>
  <option value="DZD">DZD - Algerian Dinar</option>
  <option value="MAD">MAD - Moroccan Dirham</option>
  <option value="PEN">PEN - Peruvian Sol</option>
</select>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          required
        >
          <option value="">Select Period</option>
          {periods.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
      </form>
    </div>
  );
};

export default ExchangeDataForm;
