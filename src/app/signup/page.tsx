"use client";
import React, { useState } from "react";
import s from "./signup.module.scss";
import Image from "next/image";
import logo from "/public/logo.png";
import Input from "@/components/Input";
import Link from "next/link";

const Signup = () => {
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    // You can perform additional validation here and set the error state accordingly
    setHasError(newValue.includes("error"));
  };

  return (
    <div className={s.container}>
      <div className={s.headline}>
        <Image alt="" src={logo} width={100} />
        <br />
        Sign Up <br />
        <span>Please fill details and create a account</span>
      </div>
      <div className={s.inputGrp}>
        <Input
          label="Username"
          placeholder="john doe"
          onChange={handleInputChange}
          error={hasError}
        />
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
      <div className="w-full">
        <div className="btn-primary">Sign Up</div>
        <div className={s.link}>
          Already have an account? <Link href="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
