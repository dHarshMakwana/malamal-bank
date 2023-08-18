import React from "react";
import s from "./burger.module.scss";

const Burger = () => {
  return (
    <label className={s.burger}>
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
    </label>
  );
};

export default Burger;
