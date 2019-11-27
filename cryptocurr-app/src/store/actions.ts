import { Dispatch } from "redux";
import { Rate, Asset, History } from "../models";
import { Get } from "./api";

type AssetResponse = { data: Asset[] };
type RateResponse = { data: Rate[] };
type HistoryResponse = { data: History[] };

const ASSET_LIMIT_COUNT = 20;
const WEEK = 7 * 24 * 60 * 60 * 1000;

export const loadMoreAssets = () => async (
  dispatch: Dispatch,
  getState: any
) => {
  const assets = getState().assets;
  const payload = await Get<AssetResponse>(
    `/assets?limit=${ASSET_LIMIT_COUNT}&offset=${assets.length}`
  );

  if (payload != null) {
    dispatch({
      type: "SET_ASSETS",
      payload: payload.data
    });
  }
};

export const loadInitialAssetsAndRates = () => async (
  dispatch: Dispatch,
  getState: any
) => {
  const { assets, rates } = getState();
  if (assets.length > 0 && rates.length > 0) return;

  const [assetResp, rateResp] = await Promise.all([
    Get<AssetResponse>(`/assets?limit=${ASSET_LIMIT_COUNT}`),
    Get<RateResponse>("/rates")
  ]);

  if (assetResp && rateResp) {
    dispatch({
      type: "SET_INITIAL_ASSETS_AND_RATES",
      payload: {
        assets: assetResp.data,
        rates: rateResp.data
      }
    });
  }
};

export const changeSelectedRate = ({ symbol }: Rate) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: "CHANGE_SELECTED_RATE",
    payload: symbol
  });

  localStorage.setItem("SELECTED_RATE_KEY", symbol);
};

export const loadHistory = (selectedAsset: string) => async (
  dispatch: Dispatch
) => {
  const end = new Date().valueOf();
  const start = end - WEEK;
  const url = `/assets/${selectedAsset}/history?interval=h1&start=${start}&end=${end}`;
  const historyResp = await Get<HistoryResponse>(url);

  if (historyResp != null) {
    dispatch({ type: "SET_HISTORY", payload: historyResp.data });
  }
};
