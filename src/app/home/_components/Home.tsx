"use client";
import React, { useEffect, useState } from "react";
import s from "../_styles/home.module.scss";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { useRouter } from "next/navigation";
import Greet from "./Greet";
import Balance from "./Balance";
import History from "./History";
import dynamic from "next/dynamic";
import Header from "@/components/Header";

const DepositModal = dynamic(() => import("@modals/DepositModal"), {
  ssr: false,
});
const WithdrawModal = dynamic(() => import("@modals/WithdrawModal"), {
  ssr: false,
});

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

  const [data, setData] = useState<any>(value);
  const [dipositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const router = useRouter();

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

  const { name, history, balance } = data;

  const openDeposit = () => {
    setDepositOpen(true);
  };

  const openWithdraw = () => {
    setWithdrawOpen(true);
  };

  const onSuccess = (newBalance: any, newHistory: any) => {
    setData((prevData: any) => ({
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
        <div onClick={openWithdraw} className="btn-primary">
          withdraw
        </div>
        <div onClick={openDeposit} className="btn-secondary">
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
        userId={auth.currentUser?.uid || ""}
        balance={balance}
        history={history}
        onSuccessDeposit={onSuccess}
      />
      <WithdrawModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        userId={auth.currentUser?.uid || ""}
        balance={balance}
        history={history}
        onSuccessWithdraw={onSuccess}
      />
    </div>
  );
};

export default Home;
