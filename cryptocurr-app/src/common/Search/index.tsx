import * as React from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  searchResult?: string[];
}

export const Search: React.FC<Props> = props => {
  const [hasFocus, setFocus] = React.useState(false);
  const isMenuOpen = props.searchResult && props.searchResult.length > 0;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {}

  const inputCn = "input-wrapper" + (hasFocus ? " active" : "");
  return (
    <div className="search-box">
      <div className={inputCn}>
        <input
          {...props}
          placeholder="Ara..."
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <FiSearch />
      </div>
      {isMenuOpen && (
        <ul className="menu">
          {props.searchResult!.map(r => (
            <li>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
