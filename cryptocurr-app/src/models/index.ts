export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: number;
  maxSupply?: number;
  marketCapUsd: number;
  volumeUsd24Hr: number;
  priceUsd: number;
  changePercent24Hr: number;
  vwap24Hr: number;
}

export interface Rate {
  id: string;
  type: string;
  symbol: string;
  rateUsd: number;
  currencySymbol: string;
}

export interface History {
  time: number;
  date: string;
  priceUsd: number;
  circulatingSupply: number;
}
