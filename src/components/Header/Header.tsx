"use client";
import Burger from "@/components/Burger";
import Image from "next/image";
import React from "react";
import s from "./header.module.scss";
import logo from "/public/logo.png";
import Link from "next/link";

const Header = () => {
  return (
    <div className={s.header}>
      <Link href="/">
        <Image width={50} alt="" src={logo} />
      </Link>
      <Burger />
    </div>
  );
};

export default Header;
