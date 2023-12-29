"use client";
import Burger from "@/components/Burger";
import Image from "next/image";
import React from "react";
import s from "./header.module.scss";
import logo from "/public/logo.png";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext.context";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className={s.header}>
      <Link href={!user ? "/" : "/home"}>
        <Image width={50} alt="" src={logo} />
      </Link>
      <Burger />
    </div>
  );
};

export default Header;
