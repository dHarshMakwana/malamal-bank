import React, { FC } from "react";
import s from "../_styles/home.module.scss";
import { GreetProps } from "../_types/type";

const Greet: FC<GreetProps> = ({ name }) => {
  return (
    <div className={s.hello}>
      hello <span>{name}</span>
    </div>
  );
};

export default Greet;
