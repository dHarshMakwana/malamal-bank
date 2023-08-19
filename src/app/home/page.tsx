import React from "react";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("./_components/Home"), {
  ssr: false,
});
const home = () => {
  return <Home />;
};

export default home;
