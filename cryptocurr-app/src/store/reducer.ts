import { Asset, Rate, History } from "../models";

const initialState = {
  assets: [] as Asset[],
  rates: [] as Rate[],
  history: [] as History[],
  selectedRateSymbol: localStorage.getItem("SELECTED_RATE_KEY") || "USD"
};
type State = typeof initialState;
type Reducer = (s: State, a: any) => State;

export function reducer(state = initialState, action: any): State {
  const subReducers: { [key: string]: Reducer } = {
    SET_ASSETS: setAssetsReducer,
    CHANGE_SELECTED_RATE: changeSelectedRateReducer,
    SET_INITIAL_ASSETS_AND_RATES: setInitialValuesReducer,
    SET_HISTORY: setHistoryReducer
  };

  return subReducers.hasOwnProperty(action.type)
    ? subReducers[action.type](state, action)
    : state;
}

function setInitialValuesReducer(state: State, action: any): State {
  const { selectedRateSymbol } = state;
  const rates = action.payload.rates.map(parseRateValues);
  const currentRate = findCurrencyRate(rates, selectedRateSymbol);
  return {
    ...state,
    rates: rates,
    assets: action.payload.assets
      .map(parseAssetValues)
      .map((a: Asset) => changeExchangeValues(a, 1 / currentRate.rateUsd))
  };
}

function setAssetsReducer(state: State, action: any): State {
  const { selectedRateSymbol } = state;
  const currentRate = findCurrencyRate(state.rates, selectedRateSymbol);
  const assets = action.payload
    .map(parseAssetValues)
    .map((a: Asset) => changeExchangeValues(a, 1 / currentRate.rateUsd));
  return {
    ...state,
    assets: state.assets.concat(assets)
  };
}

function changeSelectedRateReducer(state: State, action: any): State {
  const { selectedRateSymbol } = state;
  const currentRate = findCurrencyRate(state.rates, selectedRateSymbol);
  const selectedRate = findCurrencyRate(state.rates, action.payload);
  const exchange = currentRate.rateUsd / selectedRate.rateUsd;

  return {
    ...state,
    selectedRateSymbol: action.payload,
    assets: state.assets.map(a => changeExchangeValues(a, exchange))
  };
}

function setHistoryReducer(state: State, action: any): State {
  const history: History[] = action.payload.map(parseHistoryValues);
  return {
    ...state,
    history
  };
}

function findCurrencyRate(rates: Rate[], rateSymbol: string) {
  return rates.find(r => r.symbol === rateSymbol)!;
}

function changeExchangeValues(a: Asset, exchangeRate: number): Asset {
  return {
    ...a,
    supply: a.supply * exchangeRate,
    marketCapUsd: a.marketCapUsd * exchangeRate,
    volumeUsd24Hr: a.volumeUsd24Hr * exchangeRate,
    priceUsd: a.priceUsd * exchangeRate,
    vwap24Hr: a.vwap24Hr * exchangeRate
  };
}

function parseRateValues(r: any) {
  const rate: Rate = {
    ...r,
    rateUsd: parseFloat(r.rateUsd)
  };

  return rate;
}

function parseAssetValues(a: any) {
  const asset: Asset = {
    ...a,
    supply: parseFloat(a.supply),
    maxSupply: parseFloat(a.maxSupply),
    marketCapUsd: parseFloat(a.marketCapUsd),
    volumeUsd24Hr: parseFloat(a.volumeUsd24Hr),
    priceUsd: parseFloat(a.priceUsd),
    changePercent24Hr: parseFloat(a.changePercent24Hr),
    vwap24Hr: parseFloat(a.vwap24Hr)
  };

  return asset;
}
function parseHistoryValues(h: any) {
  const history: History = {
    ...h,
    priceUsd: parseFloat(h.priceUsd),
    circulatingSupply: parseFloat(h.circulatingSupply)
  };

  return history;
}
