import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  initialState,
  StockQueryType,
  StockState,
  StockSymbolQueryType,
} from '../../types/stockTypes';
import { fetchData, STOCK_API_KEY, STOCK_SYMBOL_API_KEY } from '../api';
import {
  mockSearchdata,
  mockStockData,
  timeSeriesFunctions,
} from '../../helpers';
import { RootState } from '../store';

/**
 * Finds the selected time series function from the timeSeriesFunctions array.
 *
 * @function handleSelectedFunction
 * @param {StockState} stockState - The current state of the stock slice.
 * @returns {Object|undefined} The selected time series function object, or undefined if not found.
 */
const handleSelectedFunction = (stockState: StockState) =>
  timeSeriesFunctions.find(
    (func) => func.series === stockState.timeSeriesFunction
  );

/**
 * Fetch stock data based on the selected time series function and symbol.
 *
 * @async
 * @function fetchStockData
 * @param {Object} _ - Unused parameter
 * @param {Object} thunkAPI - The thunk API object
 * @returns {Object} The stock data for the selected time series function
 */
export const fetchStockData = createAsyncThunk(
  'stock/fetchStockData',
  async (_, { getState }) => {
    const { stock } = getState() as RootState;
    const selectedFunction = handleSelectedFunction(stock);

    if (!selectedFunction) {
      throw new Error('Invalid time series function selected');
    }

    const params: StockQueryType = {
      function: stock.timeSeriesFunction,
      symbol: stock.symbol,
      apikey: STOCK_API_KEY,
    };

    const response = await fetchData(params);

    return response.data[selectedFunction.map];
  }
);

/**
 * Fetch symbol suggestions based on user input.
 *
 * @async
 * @function fetchSymbolSuggestions
 * @param {String} query - The search query
 * @returns {Array} The list of matching symbols
 */
export const fetchStockSymbolData = createAsyncThunk(
  'stock/fetchStockSymbolData',
  async (stock: StockSymbolQueryType) => {
    const params: StockSymbolQueryType = {
      function: stock.function,
      keywords: stock.keywords,
      apikey: STOCK_SYMBOL_API_KEY,
    };

    const response = await fetchData(params);

    return response.data?.bestMatches;
  }
);

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    /**
     * Set the stock symbol.
     *
     * @function setSymbol
     * @param {Object} state - The current state
     * @param {Object} action - The dispatched action containing the new symbol
     */
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    /**
     * Clear the symbol suggestions.
     *
     * @function clearSuggestions
     * @param {Object} state - The current state
     */
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
    /**
     * Set the time series function.
     *
     * @function setTimeSeriesFunction
     * @param {Object} state - The current state
     * @param {Object} action - The dispatched action containing the new time series function
     */
    setTimeSeriesFunction: (state, action) => {
      state.timeSeriesFunction = action.payload;
    },
    /**
     * Set the stock company name.
     *
     * @function setCompanyName
     * @param {Object} state - The current state
     * @param {Object} action - The dispatched action containing the company name
     */
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = false;
          state.data = action.payload;
        } else {
          /* Alpha Vantage standard API rate limit is 25 requests per day.
           * This will be used when we exhaust the rate limit
           */
          state.loading = false;
          state.data = mockStockData['Monthly Adjusted Time Series'];
        }
      })
      .addCase(fetchStockSymbolData.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = false;
          state.suggestions = action.payload;
        } else {
          /* Alpha Vantage standard API rate limit is 25 requests per day.
           * This will be used when we exhaust the rate limit
           */
          state.loading = false;
          state.suggestions = mockSearchdata.bestMatches;
        }
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch stock data';
      });
  },
});

export const {
  setSymbol,
  clearSuggestions,
  setTimeSeriesFunction,
  setCompanyName,
} = stockSlice.actions;
export default stockSlice.reducer;
