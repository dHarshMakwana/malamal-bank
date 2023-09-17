import Header from "@/components/Header/Header";
import React from "react";
import ProfilePicture from "./ProfilePicture";
import s from "../_styles/profile.module.scss";

const Profile = () => {
  return (
    <div className={s.container}>
      <Header />
      <ProfilePicture />
    </div>
  );
};

export default Profile;
