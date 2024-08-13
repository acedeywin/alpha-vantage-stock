type NormalDataProps = {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
};

export type AdjustedDataProps = {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. adjusted close': string;
  '6. volume': string;
  '7. dividend amount': string;
};

export interface NormalData {
  [key: string]: NormalDataProps;
}

export interface AdjustedData {
  [key: string]: AdjustedDataProps;
}

export interface StockMatch {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
}

export interface StockSearchResult {
  bestMatches: StockMatch[];
}

export const initialState: StockState = {
  symbol: '',
  data: null,
  loading: false,
  error: null,
  suggestions: [],
  timeSeriesFunction: '',
};

export type StockState = {
  symbol: string;
  data: NormalData | AdjustedData | null;
  loading: boolean;
  error: string | null;
  suggestions: StockMatch[];
  timeSeriesFunction: string;
};

export type StockQueryType = {
  function: string;
  symbol: string;
  apikey?: string;
};

export type StockSymbolQueryType = {
  function: string;
  keywords: string;
  apikey?: string;
};

export type FetchDataTypes = StockQueryType | StockSymbolQueryType;
export type StockData = NormalDataProps | AdjustedDataProps;
