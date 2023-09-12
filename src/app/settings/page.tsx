import React from "react";
import dynamic from "next/dynamic";

const Settings = dynamic(() => import("./_components/Settings"));

const settings = () => {
  return (
    <>
      <Settings />
    </>
  );
};

export default settings;
