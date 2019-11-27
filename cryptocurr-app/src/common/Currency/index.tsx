import * as React from "react";
import "./style.css";

interface Props {
  name: string;
  symbol: string;
}

export const Currency: React.FC<Props> = props => {
  let icon: any = "";
  try {
    icon = require(`cryptocurrency-icons/svg/color/${props.symbol.toLowerCase()}.svg`);
  } catch {
    icon = require(`cryptocurrency-icons/svg/color/generic.svg`);
  }
  return (
    <div className="currency">
      <img src={icon} alt={props.name}/>
      <div>
        <span>{props.name}</span>
        <span>{props.symbol}</span>
      </div>
    </div>
  );
}
