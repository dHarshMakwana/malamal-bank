import React, { FC } from "react";
import s from "../_styles/home.module.scss";

interface GreetProps {
  name: string;
}

const Greet: FC<GreetProps> = ({ name }) => {
  return (
    <div className={s.hello}>
      hello <span>{name}</span>
    </div>
  );
};

export default Greet;
