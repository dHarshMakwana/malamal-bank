"use client";
import React, { useState } from "react";
import s from "../_styles/home.module.scss";
import Greet from "./Greet";
import Balance from "./Balance";
import History from "./History";
import Header from "@/components/Header";
import { User, useAuth } from "@/lib/AuthContext.context";
import DepositModal from "@/components/Modals/DepositModal/DepositModal";
import TransferModal from "@/components/Modals/TransferModal/TransferModal";

const Home = () => {
  const [dipositOpen, setDepositOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const { user, setUser } = useAuth();

  const { name, history, balance } = (user as User) ?? {};

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
        <div onClick={handleDepositModal} className="btn-primary">
          deposit
        </div>
        <div onClick={() => setTransferOpen(true)} className="btn-secondary">
          Transfer
        </div>
      </div>
      <div className={s.subHeader}>
        <p>History</p>
        <span>see all</span>
      </div>
      <History history={history} />
      <DepositModal
        open={dipositOpen}
        onClose={handleDepositModal}
        balance={balance}
        history={history}
        onSuccess={onSuccess}
      />
      <TransferModal
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
      />
    </div>
  );
};

export default Home;
