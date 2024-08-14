import React, { useState } from 'react';
import {
  tableData,
  tableDataAdjusted,
  tableHeader,
  tableHeaderAdjusted,
} from '../helpers';
import { NormalData, AdjustedData, StockData } from '../types/stockTypes';
import Pagination from './Pagination';
import { getColor } from '../utils';

type OwnProps = {
  symbol: string;
  data: NormalData | AdjustedData;
  timeSeriesFunction: string;
  companyName: string;
};

type Props = OwnProps;

const Table: React.FC<Props> = ({
  symbol,
  data,
  timeSeriesFunction,
  companyName,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  /**
   * Calculate the current page data.
   *
   * @returns {Array} The data for the current page
   */
  const currentData = (): Array<string> => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return Object.keys(data).slice(startIndex, endIndex);
  };

  return (
    <div>
      {/* Stock data table */}
      <h2 className="text-lg font-bold mb-4">
        Stock Data for {`${companyName} (${symbol})`}
      </h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {tableHeader.map((header) => (
              <th key={header} className="py-2 px-4 border">
                {header}
              </th>
            ))}
            {timeSeriesFunction.includes('ADJUSTED') ? (
              tableHeaderAdjusted.map((header) => (
                <th key={header} className="py-2 px-4 border">
                  {header}
                </th>
              ))
            ) : (
              <>
                <th className="py-2 px-4 border">Volume</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentData().map((date) => (
            <tr key={date}>
              <td className="py-2 px-4 border text-gray-500">{date}</td>
              {tableData.map((item) => (
                <td
                  key={item}
                  className={`py-2 px-4 border ${getColor(data[date], item)}`}
                >
                  {data[date][item as keyof StockData]}
                </td>
              ))}
              {timeSeriesFunction.includes('ADJUSTED') ? (
                tableDataAdjusted.map((item) => (
                  <td
                    key={item}
                    className={`py-2 px-4 border ${getColor(data[date], item)}`}
                  >
                    {data[date][item as keyof StockData]}
                  </td>
                ))
              ) : (
                <>
                  <td
                    className={`py-2 px-4 border ${getColor(data[date], '5. volume')}`}
                  >
                    {data[date]['5. volume' as keyof StockData]}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        data={data}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Table;
