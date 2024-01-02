import React, { FC, ReactElement } from "react";
import s from "../_styles/home.module.scss";
import { TRANSFER_IN, DEPOSIT } from "@/lib/AuthContext.context";
import { HistoryProps } from "../_types/type";

const getHistoryItemProperties = (type: string) => {
  const isPositive = [TRANSFER_IN, DEPOSIT].includes(type);
  return {
    className: isPositive ? s.green : s.red,
    sign: isPositive ? "+" : "-",
  };
};

const History: FC<HistoryProps> = ({ history }): ReactElement => {
  return (
    <div className={s.history}>
      {history?.map((item, index: number) => {
        const { className, sign } = getHistoryItemProperties(item.type);
        return (
          <div key={index} className={s.historyItem}>
            <div>{item.type}</div>
            <div className={className}>
              {sign}
              {item.amount}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
