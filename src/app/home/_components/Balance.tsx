import React, { FC } from "react";
import s from "../_styles/home.module.scss";
import { BalanceProps } from "../_types/type";

const Balance: FC<BalanceProps> = ({ balance }) => {
  return (
    <div className={s.balance}>
      Current Balance
      <p>
        ° <span>{balance}</span>
      </p>
    </div>
  );
};

export default Balance;
