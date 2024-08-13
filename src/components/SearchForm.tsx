import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import { AppDispatch, RootState } from '../state/store';
import {
  fetchStockData,
  setSymbol,
  fetchStockSymbolData,
  clearSuggestions,
  setTimeSeriesFunction,
} from '../state/stock/stockSlice';
import { StockSymbolQueryType } from '../types/stockTypes';
import SearchAutoComplete from './SearchAutoComplete';
import { timeSeriesFunctions } from '../helpers';

const SearchForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [timeSeries, setTimeSeries] = useState('');
  const { symbol, suggestions, timeSeriesFunction } = useSelector(
    (state: RootState) => state.stock
  );

  /**
   * Handle changes to the symbol input field.
   *
   * @function handleFetchStockSymbol
   * @param {Object} e - The input change event
   */
  const handleFetchStockSymbol = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(setSymbol(e.target.value));

    const stockSymbolQuery: StockSymbolQueryType = {
      function: 'SYMBOL_SEARCH',
      keywords: symbol,
    };

    if (value) {
      /**
       * This will delay the execution of the fetchStockSymbolData function until after a
       * specified amount of time has passed since the last time it was invoked
       *
       * @function debounce
       * @param {Function} fetchStockSymbolData - The function it takes in
       */
      dispatch(debounce(fetchStockSymbolData(stockSymbolQuery)));
    } else {
      dispatch(clearSuggestions());
    }
  };

  /**
   * Handle fetching of stock data.
   *
   * @function handleFetchData
   */
  const handleFetchData = () => {
    if (symbol) {
      dispatch(fetchStockData());
      dispatch(setTimeSeriesFunction(timeSeries));
    }
  };

  /**
   * Handle changes to the time series function dropdown.
   *
   * @function handleTimeSeriesChange
   * @param {Object} e - The select change event
   */
  const handleTimeSeriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeSeries(e.target.value);
  };

  /**
   * Handle click on a suggestion.
   *
   * @function handleSuggestionClick
   * @param {String} suggestion - The selected suggestion
   */
  const handleSymbolSuggestionClick = (suggestion: string) => {
    dispatch(setSymbol(suggestion));
    dispatch(clearSuggestions());
  };

  return (
    <>
      {/* Input fields container */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Symbol input field with autocomplete suggestions */}
        <input
          type="text"
          value={symbol}
          onChange={handleFetchStockSymbol}
          className="border rounded p-2 flex-1"
          placeholder="Enter stock symbol (e.g., AAPL)"
        />
        <SearchAutoComplete
          searchedData={suggestions}
          handleSymbolSuggestionClick={handleSymbolSuggestionClick}
        />
        {/* Time series function dropdown */}
        <select
          value={timeSeries}
          onChange={handleTimeSeriesChange}
          className="border rounded p-2 flex-1"
        >
          {timeSeriesFunctions.map((func) => (
            <option key={func.series} value={func.series}>
              {func.choice}
            </option>
          ))}
        </select>
      </div>
      {/* Fetch data button */}
      <button
        onClick={handleFetchData}
        className="bg-blue-500 text-white rounded p-2 mt-2 w-full cursor-pointer"
        disabled={!symbol && !timeSeriesFunction}
      >
        Fetch Data
      </button>
    </>
  );
};

export default SearchForm;
