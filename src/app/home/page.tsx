import React from "react";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("./_components/Home"), {
  ssr: false,
});

// AiOutlineDownload;
// AiOutlineUpload;
// BiTransferAlt;

// AiOutlineVerticalAlignBottom;
// AiOutlineVerticalAlignTop;
// BiTransfer;

const home = () => {
  return <Home />;
};

export default home;
