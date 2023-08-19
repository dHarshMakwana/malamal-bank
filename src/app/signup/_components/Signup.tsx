"use client";
import React, { useState } from "react";
import s from "../_styles/signup.module.scss";
import Image from "next/image";
import logo from "/public/logo.png";
import Input from "@/components/Input/Input";
import Link from "next/link";
import github from "/public/github.svg";
import google from "/public/google.svg";
import { auth, db } from "@/config/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { generateRandomNumber } from "@/utils/randomGenerator";
import { useRouter } from "next/navigation";

const Signup = () => {
  const value = {
    name: "",
    email: "",
    password: "",
  };

  const [values, setValues] = useState(value);
  const randomNumber = generateRandomNumber();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

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

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        id: user.uid,
        account: randomNumber,
        balance: 500,
        history: [],
        isVerified: user.emailVerified,
      }).then(() => {
        console.log("ye bhi ho gaya");
        router.push("/home");
      });
      console.log(user);
    });
  };

  const handleGitHubLogin = () => {
    signInWithPopup(auth, githubProvider).then((result) => {
      const user = result.user;
      console.log("user", user);
      setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        id: user.uid,
        account: randomNumber,
        balance: 500,
        history: [],
        isVerified: user.emailVerified,
      }).then(() => {
        console.log("ye bhi ho gaya");
        router.push("/home");
      });
      console.log(user);
    });
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
