"use client";
import Header from "@/components/Header/Header";
import React from "react";
import ProfilePicture from "./ProfilePicture";
import s from "../_styles/profile.module.scss";
import Username from "./Username";

const Profile = () => {

  return (
    <div className={s.container}>
      <Header />
      <ProfilePicture />
      <Username />
    </div>
  );
};

export default Profile;
