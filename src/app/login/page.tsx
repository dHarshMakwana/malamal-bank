"use client";
import React, { useState } from "react";
import s from "./login.module.scss";
import Image from "next/image";
import logo from "/public/logo.png";
import Input from "@/components/Input/Input";
import Link from "next/link";
import facebook from "/public/facebook.svg";
import google from "/public/google.svg";
import twitter from "/public/twitter.svg";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const value = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(value);
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, values.email, values.password).then(() => {
      console.log("login bhi hogaya");
      router.push("/home");
    });
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
          name="email"
        />
        <Input
          label="Password"
          placeholder="johndoe123"
          onChange={handleInputChange}
          type="password"
          name="password"
        />
      </div>
      <div className={s.connect}>
        <div className="w-full">
          <div onClick={handleSubmit} className="btn-primary">
            Sign Up
          </div>
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
