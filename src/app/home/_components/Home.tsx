"use client";
import React, { useEffect, useState } from "react";
import s from "../_styles/home.module.scss";
import logo from "/public/logo.png";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

const Home = () => {
  const value = {
    account: "",
    balance: 0,
    email: "",
    history: [],
    id: "",
    isVerified: false,
    name: "",
  };

  const router = useRouter();
  const [data, setData] = useState<any>(value);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/");
    } else {
      const getData = async () => {
        if (auth.currentUser) {
          const id = auth.currentUser.uid;
          const docRef = doc(db, "users", id);
          const docSnap = await getDoc(docRef);
          console.log("dataaaa", docSnap.data());
          setData(docSnap.data());
        }
      };
      getData();
    }
  }, []);

  const { name, history, balance } = data;

  console.log("open",open);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Image width={50} alt="" src={logo} />
        <span>log out</span>
      </div>
      <div className={s.hello}>
        hello <span>{name}</span>
      </div>
      <div className={s.balance}>
        Current Balance
        <p>
          ° <span>{balance}</span>
        </p>
      </div>
      <div className={s.btnGrp}>
        <div onClick={() => setOpen(true)} className="btn-primary">
          withdraw
        </div>
        <div className="btn-secondary">deposit</div>
      </div>
      <div className={s.subHeader}>
        <p>History</p>
        <span>see all</span>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        hello
      </Modal>
    </div>
  );
};

export default Home;
