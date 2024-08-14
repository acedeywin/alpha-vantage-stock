import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { StockMatch } from '../types/stockTypes';
import { clearSuggestions } from '../state/stock/stockSlice';
import { AppDispatch } from '../state/store';

type OwnProps = {
  searchedData: StockMatch[];
  handleSymbolSuggestionClick: (suggestion: StockMatch) => void;
};

type Props = OwnProps;

const SearchAutoComplete: React.FC<Props> = ({
  searchedData,
  handleSymbolSuggestionClick,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();

  /**
   * Adds an event listener to handle clicks outside the input box.
   * If a click is detected outside, the suggestions are cleared.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dispatch(clearSuggestions());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div ref={dropdownRef} className="absolute w-72 left-25">
      {/* Autocomplete suggestions */}
      {searchedData && searchedData?.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded w-fit mt-12 max-h-60 overflow-y-auto">
          {searchedData.map((suggestion: StockMatch) => (
            <li
              key={suggestion['1. symbol']}
              onClick={() => handleSymbolSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion['1. symbol']} - {suggestion['2. name']}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchAutoComplete;
