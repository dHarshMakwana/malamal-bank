"use client";
import React, { useState } from "react";
import s from "../_styles/home.module.scss";
import Greet from "./Greet";
import Balance from "./Balance";
import History from "./History";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { useAuth } from "@/lib/AuthContext.context";

const DepositModal = dynamic(() => import("@modals/DepositModal"), {
  ssr: false,
});

const Home = () => {
  const [dipositOpen, setDepositOpen] = useState(false);
  const { user, setUser } = useAuth();

  const { name, history, balance } = user ?? {};

  const handleDepositModal = () => {
    setDepositOpen(!dipositOpen);
  };

  const onSuccess = (newBalance: any, newHistory: any) => {
    setUser((prevData: any) => ({
      ...prevData,
      balance: newBalance,
      history: newHistory,
    }));
  };

  return (
    <div className={s.container}>
      <Header />
      <Greet name={name} />
      <Balance balance={balance} />
      <div className={s.btnGrp}>
        <div className="btn-primary">withdraw</div>
        <div onClick={handleDepositModal} className="btn-secondary">
          deposit
        </div>
      </div>
      <div className={s.subHeader}>
        <p>History</p>
        <span>see all</span>
      </div>
      <History history={history} />
      <DepositModal
        open={dipositOpen}
        onClose={() => setDepositOpen(false)}
        userId={user?.id || ""}
        balance={balance}
        history={history}
        onSuccessDeposit={onSuccess}
      />
    </div>
  );
};

export default Home;
