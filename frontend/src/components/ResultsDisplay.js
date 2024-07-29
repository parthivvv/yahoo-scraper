import React from 'react';
import '../styles/ResultsDisplay.css';
import { useResultsContext } from './ResultsContext';

const ResultsDisplay = () => {
  const { results } = useResultsContext();

  return (
    <div className="results-display">
      <h2>Results</h2>
      {results.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <ul>
          {results.map((item) => (
            <li key={item.date}>
              Date: {new Date(item.date).toLocaleDateString()} - Rate: {item.rate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsDisplay;
