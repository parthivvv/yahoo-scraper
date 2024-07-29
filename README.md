**Yahoo Finance Scraper and Forex Data API**

**Overview**
This project is a web application that scrapes historical exchange rate data from Yahoo Finance and provides a REST API for querying this data. It also includes a frontend interface for users to interact with the API, select currency pairs, and view exchange rate data over specified periods.

**Features**

Data Scraping: Periodically scrapes exchange rate data from Yahoo Finance.
REST API: Provides endpoints to query historical exchange rate data.
Frontend Interface: A user-friendly interface for selecting currency pairs and viewing exchange rate data.
Cron Jobs: Automatically fetches and updates data at scheduled intervals.
Technologies Used
Backend: Node.js, Express, MongoDB, Mongoose
Frontend: React, HTML, CSS
Data Scraping: yahoo-finance2 package
Scheduling: node-cron


**Setup Instructions**

Prerequisites
Node.js and npm installed
MongoDB database (MongoDB Atlas recommended)


**Backend Setup**
Clone the Repository
git clone https://github.com/your-username/yahoo-finance-scraper.git
cd yahoo-finance-scraper/backend

Install Dependencies
npm install

Environment Variables
Create a .env file in the backend directory with the following variables:

MONGO_URI=your_mongo_db_connection_string
PORT=3001

Run the Backend Server
npm run dev
The backend will be available at http://localhost:3001.



**Frontend Setup**
Navigate to Frontend Directory
cd ../frontend

Install Dependencies
npm install

Run the Frontend Development Server
npm start
The frontend will be available at http://localhost:3000.


**API Endpoints**

1. Scrape and Store Data
Endpoint: POST /api/scrape
Description: Scrapes exchange rate data from Yahoo Finance and stores it in the database.
Body Parameters:
quote (string): Currency pair (e.g., EURUSD=X).
fromDate (date): Start date for the data.
toDate (date): End date for the data.
Response: Returns the stored data.

2. Fetch Forex Data
Endpoint: POST /api/forex-data
Description: Fetches historical exchange rate data for a specified currency pair and period.
Body Parameters:
from (string): From currency code (e.g., GBP).
to (string): To currency code (e.g., INR).
period (string): Timeframe for the data (e.g., 1M).
Response: Returns the queried data.
Cron Job
The node-cron package is used to schedule periodic scraping of exchange rate data. The cron job is set up to run daily at midnight and fetches data for predefined currency pairs and periods.

File: backend/cron/scraperCron.js
Scheduled Job: cron.schedule('0 0 * * *', scrapeData);


**Running the Application**
Start the Backend: Ensure MongoDB is running and start the backend server.
Start the Frontend: Run the frontend development server.
Access the Application: Open http://localhost:3000 in your browser.
Interacting with the API
Use the frontend interface or tools like Postman to interact with the API. You can:

Scrape data by specifying a currency pair and date range.
Query historical data for specific currency pairs and periods.


**Acknowledgements**
Yahoo Finance API for providing financial data.
node-cron for scheduling tasks.
