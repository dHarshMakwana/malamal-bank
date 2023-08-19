"use client";
import React, { useState } from "react";
import s from "../_styles/login.module.scss";
import Image from "next/image";
import Link from "next/link";
import { auth, db } from "@/config/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { setDoc, doc } from "firebase/firestore";
import { generateRandomNumber } from "@/utils/randomGenerator";
import logo from "/public/logo.png";
import github from "/public/github.svg";
import google from "/public/google.svg";
import Input from "@/components/Input/Input";

const Login = () => {
  const value = {
    email: "test@test.com",
    password: "test@123",
  };

  const [values, setValues] = useState(value);
  const router = useRouter();
  const randomNumber = generateRandomNumber();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (window && typeof window !== "undefined") {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        console.log("login bhi hogaya");
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
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
        Log In <br />
        <span>Please fill details to continue using app</span>
      </div>
      <div className={s.inputGrp}>
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
            Log In
          </div>
          <div className={s.link}>
            Already have an account? <Link href="/signup">Sign up</Link>
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

export default Login;
