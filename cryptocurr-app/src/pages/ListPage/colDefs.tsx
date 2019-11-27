import * as React from "react";
import { ColDef, Currency } from "../../common";
import { numberFormatter, percentFormatter } from "../../utils";
import { Asset, Rate } from "../../models";

const getColDefs = (currencyRate?: Rate) => {
  if (!currencyRate) {
    return [];
  }
  const currencyFormatter = (value: number) =>
    `${currencyRate.currencySymbol || ""}${numberFormatter.format(value)}`;

  const colDefs: ColDef[] = [
    {
      headerName: "Rank",
      dataField: "rank"
    },
    {
      headerName: "Name",
      dataField: "name",
      cellStyle: { textAlign: "left" },
      cellRenderer: (item: Asset) => (
        <Currency symbol={item.symbol} name={item.name} />
      )
    },
    {
      headerName: "Price",
      dataField: "priceUsd",
      formatter: currencyFormatter
    },
    {
      headerName: "Marked Cap",
      dataField: "marketCapUsd",
      formatter: currencyFormatter
    },
    {
      headerName: "VWAP (24Hr)",
      dataField: "vwap24Hr",
      formatter: currencyFormatter
    },
    {
      headerName: "Supply",
      dataField: "supply",
      formatter: currencyFormatter
    },
    {
      headerName: "Volume(24Hr)",
      dataField: "volumeUsd24Hr",
      formatter: currencyFormatter
    },
    {
      headerName: "Change(24Hr)",
      dataField: "changePercent24Hr",
      formatter: (value: number) => percentFormatter.format(value / 100)
    }
  ];
  return colDefs;
};

export default getColDefs;
