import React, { FC, useState } from "react";
import Modal, { ModalProps } from "../Modal";
import Input from "@components/Input";
import s from "./modal.module.scss";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

interface DepositProps extends ModalProps {
  userId: string;
  balance: number;
  history: object[];
}

const DepositModal: FC<DepositProps> = ({
  onClose,
  open,
  userId,
  balance,
  history,
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
          message: "you can't deposit more than 50000",
        });
      } else {
        setError({ isError: false, message: "" });
        setDoc(
          doc(db, "users", userId),
          {
            balance: balance + +amount,
            history: [
              ...history,
              {
                type: "deposit",
                amount: amount,
                date: new Date(),
              },
            ],
            // depositLimit: 50000 - amount,
          },
          { merge: true }
        ).then(() => onClose());
      }
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className={s.container}>
        <h1>Deposit some &#128184;</h1>
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
            Deposit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DepositModal;
