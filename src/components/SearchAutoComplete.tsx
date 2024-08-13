import React from 'react';
import { StockMatch } from '../types/stockTypes';

type OwnProps = {
  searchedData: StockMatch[];
  handleSymbolSuggestionClick: (suggestion: string) => void;
};

type Props = OwnProps;

const SearchAutoComplete: React.FC<Props> = ({
  searchedData,
  handleSymbolSuggestionClick,
}) => {
  return (
    <>
      {/* Autocomplete suggestions */}
      {searchedData && searchedData?.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-12 max-h-60 overflow-y-auto">
          {searchedData.map((suggestion: StockMatch) => (
            <li
              key={suggestion['1. symbol']}
              onClick={() =>
                handleSymbolSuggestionClick(suggestion['1. symbol'])
              }
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion['1. symbol']} - {suggestion['2. name']}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default SearchAutoComplete;
