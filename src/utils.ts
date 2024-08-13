import { StockData } from './types/stockTypes';

/**
 * Calculates the pagination window for displaying page numbers.
 *
 * @function calculatePaginationWindow
 * @returns {Array<number>} An array of page numbers for the pagination window.
 */
export const calculatePaginationWindow = (
  totalPages: () => number,
  currentPage: number
): Array<number> => {
  const total = totalPages(); // Total number of pages
  const windowSize = 10; // Maximum number of page numbers to display in the window
  const halfWindow = Math.floor(windowSize / 2); // Half of the window size
  let start = currentPage - halfWindow; // Start of the pagination window
  let end = currentPage + halfWindow; // End of the pagination window

  // Adjust start and end if they go beyond the total pages
  if (start < 1) {
    start = 1;
    end = Math.min(windowSize, total);
  } else if (end > total) {
    end = total;
    start = Math.max(1, total - windowSize + 1);
  }

  // Create an array of page numbers for the pagination window
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * Determines the color class for each cell based on the given rules.
 *
 * @function getColor
 * @param {StockData} data - The data for the current date.
 * @param {string} item - The current item being evaluated.
 * @returns {string} The color class to apply.
 */

/* Add colors to the table data with the below rules:
 * If '1. open' >= '2. high' then both should be green else '1. open' should be red
 * '3. low' should always be red
 * if '4. close' >= '2. high' then '4. close' should be green else red. Same with '5. adjusted close'
 * '6. volume', '7. dividend amount' and '5. volume' should always be gray
 */

export const getColor = (data: StockData, item: string): string => {
  const open = parseFloat(data['1. open']);
  const high = parseFloat(data['2. high']);
  const close = parseFloat(data['4. close']);
  const adjustedClose =
    '5. adjusted close' in data
      ? parseFloat(data['5. adjusted close'])
      : undefined;

  switch (item) {
    case '1. open':
      return open >= high ? 'text-green-500' : 'text-red-500';
    case '2. high':
      return 'text-green-500';
    case '3. low':
      return 'text-red-500';
    case '4. close':
      return close >= high ? 'text-green-500' : 'text-red-500';
    case '5. adjusted close':
      return adjustedClose && adjustedClose >= high
        ? 'text-green-500'
        : 'text-red-500';
    case '5. volume':
    case '6. volume':
    case '7. dividend amount':
      return 'text-gray-500';
    default:
      return '';
  }
};
