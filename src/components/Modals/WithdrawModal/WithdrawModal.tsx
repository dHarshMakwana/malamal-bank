import React, { FC, useState } from "react";
import Modal, { ModalProps } from "../Modal";
import Input from "@components/Input";
import s from "./modal.module.scss";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

interface WithdrawProps extends ModalProps {
  userId: string;
  balance: number;
  history: object[];
  onSuccessWithdraw: (newBalance: number, newHistory: object[]) => void;
}

const WithdrawModal: FC<WithdrawProps> = ({
  onClose,
  open,
  userId,
  balance,
  history,
  onSuccessWithdraw,
}) => {
  const [amount, setAmount] = useState<number>();
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const handleOnchange = (e: any) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    if (amount) {
      if (amount > 50000 && amount < 0) {
        setError({
          isError: true,
          message: "you can't withdraw more than 50000 at a time",
        });
      } else {
        if (amount <= balance) {
          setError({ isError: false, message: "" });
          setDoc(
            doc(db, "users", userId),
            {
              balance: balance - amount,
              history: [
                ...history,
                {
                  type: "withdraw",
                  amount: amount,
                  date: new Date(),
                },
              ],
              // withdrawLimit: 50000 - amount,
            },
            { merge: true }
          ).then(() => {
            onSuccessWithdraw(balance - amount, [
              ...history,
              {
                type: "withdraw",
                amount: amount,
                date: new Date(),
              },
            ]);

            onClose();
          });
        } else {
          setError({ isError: true, message: "you don't have enough balance" });
        }
      }
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className={s.container}>
        <h1>Withdraw some &#128184;</h1>
        <Input
          label={""}
          placeholder={"enter amount"}
          type="number"
          onChange={handleOnchange}
          value={amount}
          error={error.isError}
          errorMessage={error.message}
        />
        <div className={s.btnGroup}>
          <button
            onClick={handleSubmit}
            className="btn-primary"
            disabled={!amount}
          >
            Withdraw
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
