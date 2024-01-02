import React from "react"; 
import dynamic from "next/dynamic";

const QrScan = dynamic(() => import("./_components/QrScan"), { ssr: false });

const qrscan = () => {
  return <QrScan />;
};

export default qrscan;
