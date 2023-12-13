'use client'
import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { useAuth } from "@/lib/AuthContext.context";

const Scanner = () => {
  const { user } = useAuth();
  const canvasRef = useRef<HTMLDivElement>(null);

  let qrCode: QRCodeStyling | null = null;

  if (user) {
    qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "svg",
      data: user.account.toString(),
      image: "../../logo.png",
      dotsOptions: {
        color: "#39ff14",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#000",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 15,
      },
    });
  }

  useEffect(() => {
    if (canvasRef.current && qrCode) {
      qrCode.append(canvasRef.current);
    }
  }, [qrCode]);

  return (
    <>
      <div ref={canvasRef}></div>
    </>
  );
};

export default Scanner;
