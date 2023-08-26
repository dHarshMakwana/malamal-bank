"use client";
import React, { useContext, useState } from "react";
import s from "../_styles/signup.module.scss";
import Image from "next/image";
import logo from "/public/logo.png";
import Input from "@/components/Input/Input";
import Link from "next/link";
import github from "/public/github.svg";
import google from "/public/google.svg";
import { generateRandomNumber } from "@/utils/randomGenerator";
import { useAuth } from "@/lib/AuthContext.context";

const Signup = () => {
  const value = {
    name: "",
    email: "",
    password: "",
  };

  const [values, setValues] = useState(value);
  const randomNumber = generateRandomNumber();
  const { signup, googleLogin, githubLogin } = useAuth();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    signup(values.email, values.password, values.name, randomNumber);
  };

  const handleGoogleLogin = () => {
    googleLogin(randomNumber);
  };

  const handleGitHubLogin = () => {
    githubLogin(randomNumber);
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
          label="name"
          placeholder="john doe"
          onChange={handleInputChange}
          name="name"
          value={values.name}
        />
        <Input
          label="Email"
          placeholder="johndoe@gmail.com"
          onChange={handleInputChange}
          name="email"
          value={values.email}
        />
        <Input
          label="Password"
          placeholder="johndoe123"
          onChange={handleInputChange}
          type="password"
          name="password"
          value={values.password}
        />
      </div>
      <div className={s.connect}>
        <div className="w-full">
          <div onClick={handleSubmit} className="btn-primary">
            Sign Up
          </div>
          <div className={s.link}>
            Already have an account? <Link href="/login">Log in</Link>
          </div>
        </div>
        <span>Or connect with</span>
        <div className={s.iconGrp}>
          <div onClick={handleGoogleLogin} className={s.iconCover}>
            <Image alt="" src={google} className={s.icon} />
          </div>
          <div onClick={handleGitHubLogin} className={s.iconCover}>
            <Image alt="" src={github} className={s.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
