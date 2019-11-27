import * as React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import {
  AppState,
  changeSelectedRate,
  loadMoreAssets,
  loadInitialAssetsAndRates
} from "../../store";
import { Table, Button, Search } from "../../common";
import { Asset, Rate } from "../../models";
import getColDefs from "./colDefs";

interface Props {
  assets: Asset[];
  rateOptions: Rate[];
  selectedCurrency?: Rate;
  getAssets(): void;
  loadInitialValues(): void;
  onRateChange(option: any): void;
}

export const ListPage: React.FC<Props> = props => {
  const history = useHistory();

  React.useEffect(() => {
    props.loadInitialValues();
    // eslint-disable-next-line
  }, []);

  const colDefs = React.useMemo(() => getColDefs(props.selectedCurrency), [
    props.selectedCurrency
  ]);

  

  return (
    <div className="container">
      <div className="header">
        <Select
          isSearchable={true}
          getOptionLabel={r => `${r.id.toUpperCase()} (${r.symbol})`}
          getOptionValue={r => r.symbol}
          value={props.selectedCurrency}
          options={props.rateOptions}
          onChange={props.onRateChange}
        />
        <Search />
      </div>
      <Table
        idField="id"
        colDefs={colDefs}
        dataSource={props.assets}
        onRowClick={(row: Asset) => history.push(`/details/${row.id}`)}
      />
      <div className="center">
        <Button onClick={props.getAssets} text="Daha Fazla Göster" />
      </div>
    </div>
  );
};

const selectCurrencyRateOption = ({ rates, selectedRateSymbol }: AppState) =>
  rates.find(r => r.symbol === selectedRateSymbol);

const mapStateToProps = (state: AppState) => ({
  assets: state.assets,
  selectedCurrency: selectCurrencyRateOption(state),
  rateOptions: state.rates
});
const mapDispatchToProps = {
  loadInitialValues: loadInitialAssetsAndRates,
  onRateChange: changeSelectedRate,
  getAssets: loadMoreAssets
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
