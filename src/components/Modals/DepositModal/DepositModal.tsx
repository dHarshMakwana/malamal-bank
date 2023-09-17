import React, { FC, useEffect, useRef, useState } from "react";
import Modal, { ModalProps } from "../Modal";
import Input from "@components/Input";
import s from "./modal.module.scss";
import { useAuth } from "@/lib/AuthContext.context";

interface DepositProps extends ModalProps {
  userId: string;
  balance: number;
  history: object[];
  onSuccessDeposit: (newBalance: number, newHistory: object[]) => void;
}

const DepositModal: FC<DepositProps> = ({
  onClose,
  open,
  userId,
  balance,
  history,
  onSuccessDeposit,
}) => {
  const [amount, setAmount] = useState<number>();
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const { setUserDocument } = useAuth();
  const handleOnchange = (e: any) => {
    setAmount(e.target.value);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    if (amount) {
      if (amount > 50000 && amount < 0) {
        setError({
          isError: true,
          message: "you can't deposit more than 50000",
        });
      } else {
        setError({ isError: false, message: "" });
        setUserDocument({
          balance: balance + +amount,
          history: [
            ...history,
            {
              type: "deposit",
              amount: amount,
              date: new Date(),
            },
          ],
        }).then(() => {
          onSuccessDeposit(balance + +amount, [
            ...history,
            {
              type: "deposit",
              amount: amount,
              date: new Date(),
            },
          ]);

          onClose();
        });
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
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
          autoFocus
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
