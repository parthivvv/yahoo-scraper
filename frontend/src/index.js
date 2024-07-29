import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ResultsProvider } from './components/ResultsContext';

ReactDOM.render(
  <ResultsProvider>
    <App />
  </ResultsProvider>,
  document.getElementById('root')
);
