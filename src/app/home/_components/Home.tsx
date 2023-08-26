"use client";
import React, { useEffect, useState } from "react";
import s from "../_styles/home.module.scss";
import logo from "/public/logo.png";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { useRouter } from "next/navigation";
import DepositModal from "@modals/DepositModal";
import WithdrawModal from "@modals/WithdrawModal";
import Burger from "@components/Burger";
import { useAuth } from "@/lib/AuthContext.context";

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
  const [dipositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      // console.log(user);
      setData(user);
    }
  }, [user]);

  const { name, history, balance } = data;

  // console.log("first", auth.currentUser);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Image width={50} alt="" src={logo} />
        {/* <span>log out</span> */}
        <Burger />
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
        <div onClick={() => setWithdrawOpen(true)} className="btn-primary">
          withdraw
        </div>
        <div onClick={() => setDepositOpen(true)} className="btn-secondary">
          deposit
        </div>
      </div>
      <div className={s.subHeader}>
        <p>History</p>
        <span>see all</span>
      </div>
      <div className={s.history}>
        {history &&
          history.reverse().map((item: any, index: number) => (
            <div key={index} className={s.historyItem}>
              <div className="">{item.type}</div>
              <div className={item.type == "deposit" ? s.green : s.red}>
                {" "}
                {item.type == "deposit" ? "+" : "-"} {item.amount}
              </div>
            </div>
          ))}
      </div>
      <DepositModal
        open={dipositOpen}
        onClose={() => setDepositOpen(false)}
        userId={auth.currentUser?.uid as string}
        balance={balance}
        history={history}
        onSuccessDeposit={(newBalance, newHistory) => {
          setData((prevData: any) => ({
            ...prevData,
            balance: newBalance,
            history: newHistory,
          }));
        }}
      />
      <WithdrawModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        userId={auth.currentUser?.uid as string}
        balance={balance}
        history={history}
        onSuccessWithdraw={(newBalance, newHistory) => {
          setData((prevData: any) => ({
            ...prevData,
            balance: newBalance,
            history: newHistory,
          }));
        }}
      />
    </div>
  );
};

export default Home;
