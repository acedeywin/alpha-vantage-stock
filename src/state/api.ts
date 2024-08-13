import axios from 'axios';
import { FetchDataTypes } from '../types/stockTypes';

export const baseUrl = 'https://www.alphavantage.co/query';

export const STOCK_SYMBOL_API_KEY = import.meta.env.VITE_STOCK_SYMBOL_API_KEY;
export const STOCK_API_KEY = import.meta.env.VITE_STOCK_API_KEY;

/**
 * fetch data using axios.
 *
 * @function fetchData
 * @param {Object} - The data from the stock API
 */
export const fetchData = async (params: FetchDataTypes) => {
  const response = await axios.get(baseUrl, { params });
  return response;
};
