"use client";
import React, { useState } from "react";
import s from "../_styles/login.module.scss";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/config/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import logo from "/public/logo.png";
import github from "/public/github.svg";
import google from "/public/google.svg";
import Input from "@/components/Input/Input";
import { useAuth } from "@/lib/AuthContext.context";

const Login = () => {
  const value = {
    email: "test@test.com",
    password: "test@123",
  };

  const [values, setValues] = useState(value);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const { login, isUser } = useAuth();

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
        await login(values.email, values.password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider).then(() => {
      router.push("/home");
    });
  };

  const handleGitHubLogin = () => {
    signInWithPopup(auth, githubProvider).then(() => {
      router.push("/home");
    });
  };

  if (isUser()) {
  router.push("/home");
  }

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
           New Here? <Link href="/signup">Sign up</Link>
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
