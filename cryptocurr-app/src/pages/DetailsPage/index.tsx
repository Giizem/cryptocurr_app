import * as React from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { History, Rate } from "../../models";
import { AppState, loadHistory } from "../../store";
import { createDateFormatter } from "../../utils";

const formatDate = createDateFormatter({
  weekday: "short",
  hour: "numeric",
});

interface Props {
  currency?: Rate;
  dataSource: History[];
  loadData(id: string): void;
}

export const DetailsPage: React.FC<Props> = props => {
  const { currency, dataSource } = props;
  const { id } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    props.loadData(id!);
    //eslint-disable-next-line
  }, [id]);

  const chartData: ChartData = React.useMemo(() => {
    const rateUsd = currency ? currency.rateUsd : 1;
    return {
      labels: dataSource.map(t => formatDate(t.time)),
      datasets: [
        {
          label: id,
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: dataSource.map(t => t.priceUsd / rateUsd)
        }
      ]
    };
  }, [id, dataSource, currency]);

  return (
    <div className="container">
      <button onClick={() => history.push("/")}>Back</button>
      <div>Details: {id}</div>
      <Line data={chartData} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  dataSource: state.history,
  currency: state.rates.find(r => r.symbol === state.selectedRateSymbol),
});
const mapDispatchToProps = {
  loadData: loadHistory
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
