import React from "react";
import s from "./loader.module.scss";
import logo from "/public/logo.png";
import Image from "next/image";

const Loader = () => {
  return (
    <div className={s.loader}>
      <Image src={logo} alt="logo" width={80} height={80} priority />
    </div>
  );
};

export default Loader;
