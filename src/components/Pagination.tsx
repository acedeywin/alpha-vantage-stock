import React from 'react';
import { NormalData, AdjustedData } from '../types/stockTypes';

type OwnProps = {
  data: NormalData | AdjustedData;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  currentPage: number;
};

type Props = OwnProps;

const Pagination: React.FC<Props> = ({
  data,
  setCurrentPage,
  itemsPerPage,
  currentPage,
}) => {
  /**
   * Calculates the pagination window for displaying page numbers.
   *
   * @function calculatePaginationWindow
   * @returns {Array<number>} An array of page numbers for the pagination window.
   */
  const calculatePaginationWindow = () => {
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
   * Handle page change.
   *
   * @function handlePageChange
   * @param {Number} pageNumber - The page number to navigate to
   */
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  /**
   * Calculate the total number of pages.
   *
   * @returns {Number} The total number of pages
   */
  const totalPages = () => {
    return Math.ceil(Object.keys(data).length / itemsPerPage);
  };

  return (
    <div className="flex justify-center mt-4">
      {calculatePaginationWindow().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`px-3 py-1 mx-1 border rounded ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
