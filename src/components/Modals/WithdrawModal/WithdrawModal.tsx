import React, { FC, useState } from "react";
import Modal, { ModalProps } from "../Modal";
import Input from "@components/Input";
import s from "./modal.module.scss";
import { useAuth } from "@/lib/AuthContext.context";

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

  const { setUserDocument } = useAuth();

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
          setUserDocument({
            balance: balance - amount,
            history: [
              ...history,
              {
                type: "withdraw",
                amount: amount,
                date: new Date(),
              },
            ],
          }).then(() => {
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
          autoFocus
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
