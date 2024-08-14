import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../state/store';
import SearchForm from './SearchForm';
import Table from './Table';

const StockData: React.FC = () => {
  const { symbol, data, loading, error, timeSeriesFunction, companyName } =
    useSelector((state: RootState) => state.stock);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <SearchForm />
      {/* Loading indicator */}
      {loading && <p>Loading...</p>}
      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <Table
          symbol={symbol}
          data={data}
          timeSeriesFunction={timeSeriesFunction}
          companyName={companyName}
        />
      )}
    </div>
  );
};

export default StockData;
