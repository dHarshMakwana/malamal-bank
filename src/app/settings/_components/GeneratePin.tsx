"use client";
import Input from "@/components/Input/Input";
import React, { useEffect, useState } from "react";
import s from "../_styles/settings.module.scss";
import { randomPinGenerator } from "@/utils/randomPinGenerator";
import { toast } from "react-hot-toast";
import { useAuth } from "@/lib/AuthContext.context";

const GeneratePin = () => {
  const [pin, setPin] = useState<string>("");
  const [isPinAvailable, setIsPinAvailable] = useState<boolean>();
  const { user, checkPin, setUserDocument } = useAuth();

  const generatePin = async (pin: string) => {
    try {
      if (checkPin(pin)) {
        toast.error("new pin can't be same as old one");
      } else if (pin !== "") {
        await setUserDocument({
          pin: pin,
        });
        toast.success("pin generated successfully");
        setIsPinAvailable(true);
        setPin("");
      } else {
        toast.error("pin can't be set empty");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.pin) {
      setIsPinAvailable(true);
    }
  }, [user]);

  const handleGenerateButtonClick = (pin: string) => {
    if (isPinAvailable) {
      if (checkPin(pin)) {
        setPin("");
        setIsPinAvailable(false);
      } else {
        toast.error("incorrect pin, try again!");
      }
    } else {
      generatePin(pin);
    }
  };

  return (
    <div className={s.GeneratePin}>
      <h2>Generate Pin</h2>
      <Input
        label={""}
        placeholder={"XXXX"}
        onChange={(e) => setPin(e.target.value)}
        value={pin}
        type="pin"
      />
      {isPinAvailable ? (
        <>
          <div className={s.bottomText}>
            Enter your old pin to create a new one
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => setPin(randomPinGenerator())}
            className={s.bottomText}
          >
            Generate random
          </div>
        </>
      )}
      <div className={s.btn}>
        <div
          onClick={() => handleGenerateButtonClick(pin)}
          className="btn-primary"
        >
          {isPinAvailable ? "change pin" : "generate"}
        </div>
      </div>
    </div>
  );
};

export default GeneratePin;
