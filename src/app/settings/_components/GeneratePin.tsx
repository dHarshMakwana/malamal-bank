"use client";
import Input from "@/components/Input/Input";
import React, { useEffect, useState } from "react";
import s from "../_styles/settings.module.scss";
import { randomPinGenerator } from "@/utils/randomPinGenerator";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/lib/AuthContext.context";

const GeneratePin = () => {
  const value = {
    account: "",
    balance: 0,
    email: "",
    history: [],
    id: "",
    isVerified: false,
    name: "",
    pin: null,
  };

  const [data, setData] = useState<DocumentData | undefined>(value);
  const [pin, setPin] = useState<string>("");
  const router = useRouter();
  const [isPinAvailable, setIsPinAvailable] = useState<boolean>();
  // const { generatePin } = useAuth();

  const generatePin = async (pin: string) => {
    if (checkPin(pin)) {
      toast.error("new pin can't be same as old one");
    } else if (pin !== "") {
      await setDoc(
        doc(db, "users", data?.id),
        {
          pin: pin,
        },
        { merge: true }
      );
      toast.success("pin generated successfully");
      setIsPinAvailable(true);
      setPin("");
    } else {
      toast.error("pin can't be set empty");
    }
  };

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/");
    } else {
      const getData = async () => {
        if (auth.currentUser) {
          const id = auth.currentUser.uid;
          const docRef = doc(db, "users", id);
          const docSnap = await getDoc(docRef);
          setData(docSnap.data());
        }
      };

      getData();
    }
  }, [auth]);

  useEffect(() => {
    if (data?.pin) {
      setIsPinAvailable(true);
    }
  }, [data]);

  const checkPin = (enteredPin: string) => {
    if (data && data.pin === enteredPin) {
      return true;
    } else {
      return false;
    }
  };

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

  console.log(data?.pin);

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
