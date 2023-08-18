import dynamic from "next/dynamic";
import React from "react";

const Signup = dynamic(() => import("./_components/Signup"), {
  ssr: false,
});

const signup = () => {
  return <Signup />;
};

export default signup;
