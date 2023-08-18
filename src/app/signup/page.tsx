"use client";
import React, { useContext, useState } from "react";
import s from "./signup.module.scss";
import Image from "next/image";
import logo from "/public/logo.png";
import Input from "@/components/Input/Input";
import Link from "next/link";
import facebook from "/public/facebook.svg";
import google from "/public/google.svg";
import twitter from "/public/twitter.svg";
import { auth, db } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { generateRandomNumber } from "@/utils/randomGenerator";
import { useRouter } from "next/navigation";

const Signup = () => {
  const value = {
    name: "",
    email: "",
    password: "",
  };
  const iconArray = [
    { icon: google, onClick: () => console.log("first") },
    { icon: twitter, onClick: () => console.log("first") },
    { icon: facebook, onClick: () => console.log("first") },
  ];

  const [values, setValues] = useState(value);
  const randomNumber = generateRandomNumber();
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, values.email, values.password).then(
      (user) => {
        console.log("user ban gaya", user);
        setDoc(doc(db, "users", user.user.uid), {
          name: values.name,
          email: values.email,
          id: user.user.uid,
          account: randomNumber,
          balance: 500,
          history: [],
          isVerified: user.user.emailVerified,
        }).then(() => {
          console.log("ye bhi ho gaya");
          router.push("/home");
        });
      }
    );
  };

  return (
    // <AuthContextProvider>
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
        />
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
            Already have an account? <Link href="/login">Log in</Link>
          </div>
        </div>
        <span>Or connect with</span>
        <div className={s.iconGrp}>
          {iconArray.map((item, i) => (
            <div key={i} onClick={item.onClick} className="">
              <Image alt="" src={item.icon} className={s.icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
    // {/* </AuthContextProvider> */}
  );
};

export default Signup;
