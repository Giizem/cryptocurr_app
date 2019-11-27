import * as React from "react";
import "./style.css";

export interface ColDef {
  headerName: string;
  dataField: string;
  formatter?(item: any): string;
  cellRenderer?(item: any): React.ReactElement;
  cellStyle?: React.CSSProperties;
}

interface Props {
  idField: string;
  colDefs: ColDef[];
  dataSource: any[];
  onRowClick(item: any): void;
}

export const Table: React.FC<Props> = props => {
  return (
    <table>
      <thead>
        <tr>
          {props.colDefs.map(col => (
            <td style={col.cellStyle} key={col.headerName}>{col.headerName}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.dataSource.map(item => (
          <tr key={item[props.idField]} onClick={() => props.onRowClick(item)}>
            {props.colDefs.map((col, idx) => {
              const value = item[col.dataField];
              return (
                <td style={col.cellStyle} key={idx}>
                  {col.cellRenderer
                    ? col.cellRenderer(item)
                    : col.formatter
                    ? col.formatter(value)
                    : value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
