import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import ExchangeDataForm from './components/ExchangeDataForm';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <section className="content">
          <ExchangeDataForm />
          <ResultsDisplay />
        </section>
      </div>
    </div>
  );
}

export default App;
