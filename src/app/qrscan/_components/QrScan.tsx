import React from "react";
import s from "../_styles/QrScan.module.scss";
import Scanner from "./Scanner";
import Reader from "./Reader";

const QrScan = () => {
  return (
    <>
      <div className={s.container}>
        <Reader />
        <Scanner />
      </div>
    </>
  );
};

export default QrScan;
