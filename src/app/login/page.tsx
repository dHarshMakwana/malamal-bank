import React from "react";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("./_components/Login"), {
  ssr: false,
});

const login = () => {
  return <Login />;
};

export default login;
