import React from 'react';
import StockData from './components/StockData';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl">Alpha Vantage Stock Data</h1>
      </header>
      <main className="p-4">
        <StockData />
      </main>
    </div>
  );
};

export default App;
