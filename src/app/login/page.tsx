"use client";
import React, { useState } from "react";
import s from "./login.module.scss";
import Image from "next/image";
import logo from "/public/logo.png";
import Input from "@/components/Input";
import Link from "next/link";
import facebook from "/public/facebook.svg";
import google from "/public/google.svg";
import twitter from "/public/twitter.svg";

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    // You can perform additional validation here and set the error state accordingly
    setHasError(newValue.includes("error"));
  };

  const iconArray = [google, twitter, facebook];
  return (
    <div className={s.container}>
      <div className={s.headline}>
        <Image alt="" src={logo} width={100} />
        <br />
        Log In <br />
        <span>Please fill details to continue using app</span>
      </div>
      <div className={s.inputGrp}>
        <Input
          label="Email"
          placeholder="johndoe@gmail.com"
          onChange={handleInputChange}
          error={hasError}
        />
        <Input
          label="Password"
          placeholder="johndoe123"
          onChange={handleInputChange}
          error={hasError}
          type="password"
        />
      </div>
      <div className={s.connect}>
        <div className="w-full">
          <div className="btn-primary">Log In</div>
          <div className={s.link}>
            Already have an account? <Link href="/signup">Sign up</Link>
          </div>
        </div>
        <span>Or connect with</span>
        <div className={s.iconGrp}>
          {iconArray.map((icon, i) => (
            <Image key={i} alt="" src={icon} className={s.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
