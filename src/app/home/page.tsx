import React from "react";
import s from "./home.module.scss";
import logo from "/public/logo.png";
import Image from "next/image";

const home = () => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <Image width={50} alt="" src={logo} />
        <span>log out</span>
      </div>
      <div className={s.hello}>
        hello <span>user</span>
      </div>
      <div className={s.balance}></div>
      <div className={s.subHeader}>
        <p>History</p>
        <span>see all</span>
      </div>
    </div>
  );
};

export default home;
