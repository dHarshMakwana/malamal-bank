import React, { FC } from "react";
import s from "../_styles/home.module.scss";

interface HistoryProps {
  history: object[];
}

const History: FC<HistoryProps> = ({ history }) => {
  return (
    <div className={s.history}>
      {history &&
        history.reverse().map((item: any, index: number) => (
          <div key={index} className={s.historyItem}>
            <div className="">{item.type}</div>
            <div
              className={
                item.type == "deposit" || item.type == "transfer in"
                  ? s.green
                  : s.red
              }
            >
              {item.type == "deposit" || item.type == "transfer in" ? "+" : "-"}
              {item.amount}
            </div>
          </div>
        ))}
    </div>
  );
};

export default History;
