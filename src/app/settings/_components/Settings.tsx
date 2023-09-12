import Header from "@/components/Header";
import React from "react";
import s from "../_styles/settings.module.scss";
import GeneratePin from "./GeneratePin";

const Settings = () => {
  return (
    <div className={s.container}>
      <Header />
      <h1>Settings</h1>
      <GeneratePin />
    </div>
  );
};

export default Settings;
