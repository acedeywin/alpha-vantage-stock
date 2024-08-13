import React from 'react';
import { NormalData, AdjustedData } from '../types/stockTypes';
import { calculatePaginationWindow } from '../utils';

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
      {calculatePaginationWindow(totalPages, currentPage).map((pageNumber) => (
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
