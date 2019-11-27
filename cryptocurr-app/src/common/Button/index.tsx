import * as React from "react";
import "./style.css";

interface Props {
  text: string;
  onClick(): void;
  primary?: boolean;
}
export const Button: React.FC<Props> = props => {
  return (
    <button className="btn" onClick={props.onClick}>
      {props.text}
    </button>
  );
};
