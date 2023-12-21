"use client";
import Header from "@/components/Header/Header";
import React from "react";
import ProfilePicture from "./ProfilePicture";
import s from "../_styles/profile.module.scss";
import Username from "./Username";
import AccountNumber from "./AccountNumber";

const Profile = () => {
  return (
    <div className={s.container}>
      <Header />
      <ProfilePicture />
      <Username />
      <AccountNumber />
    </div>
  );
};

export default Profile;
