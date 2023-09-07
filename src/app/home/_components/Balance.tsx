import React, { FC } from "react";
import s from "../_styles/home.module.scss";

interface BalanceProps {
  balance: number;
}

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
