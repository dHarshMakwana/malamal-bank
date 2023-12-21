"use client";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const Reader = () => {
  const [data, setData] = useState("No result");

  const qrStyling = {
    width: "100%",
    height: "100%",
  };

  return (
    <>
      <div style={qrStyling}>
        <QrReader
          onResult={(result, error) => {
            if (result) {
              setData(result.text);
            }
            if (!!error) {
              console.info(error);
            }
          }}
          constraints={{ facingMode: "environment" }}
        />
      </div>
      <p>{data}</p>
    </>
  );
};

export default Reader;
