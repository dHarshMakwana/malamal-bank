import Burger from "@/components/Burger/Burger";
import Image from "next/image";
import React from "react";
import s from "../_styles/home.module.scss";
import logo from "/public/logo.png";

const Header = () => {
  return (
    <div className={s.header}>
      <Image width={50} alt="" src={logo} />
      <Burger />
    </div>
  );
};

export default Header;
