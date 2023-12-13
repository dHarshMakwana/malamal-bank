import React from "react";
import s from "../_styles/QrScan.module.scss";
import Scanner from "./Scanner";

const QrScan = () => {
  return (
    <>
      <div className={s.container}>
        <Scanner />
      </div>
    </>
  );
};

export default QrScan;
