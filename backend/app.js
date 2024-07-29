const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exchangeRoutes = require('./routes/exchangeRoutes');
const forexDataRoutes = require('./routes/forexDataRoutes');
const { scrapeData } = require('./cron/scraperCron');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: ['*', 'http://localhost:3000'],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://parthivc2002:yLojn3psbiAIk7uO@test.g5utdbt.mongodb.net/exchange_data?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', exchangeRoutes);
app.use('/api', forexDataRoutes);

scrapeData();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
