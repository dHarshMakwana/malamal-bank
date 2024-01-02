import React, { FC, useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import Input from "@components/Input";
import s from "./modal.module.scss";
import { ITransaction, useAuth } from "@/lib/AuthContext.context";
import { DepositProps } from "../type";

const DepositModal: FC<DepositProps> = ({
  onClose,
  open,
  balance,
  history,
  onSuccess,
}) => {
  const { setUserDocument } = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "" || /^\d+(\.\d{0,2})?$/.test(inputValue)) {
      setAmount(inputValue);
      setError({
        isError: false,
        message: "",
      });
    } else {
      setError({
        isError: true,
        message:
          "Invalid input. Please enter a valid number with up to 2 decimal places.",
      });
    }
  };

  const validateAmount = (amount: string) => {
    const parsedAmount = parseFloat(amount);
    if (parsedAmount > 50000 || parsedAmount < 0) {
      return {
        isValid: false,
        errorMessage: "You can't deposit more than 50000 or less than 0.",
      };
    }
    return { isValid: true };
  };

  const addToTransactionHistory = async (
    parsedAmount: number,
    balance: number,
    history: ITransaction[]
  ) => {
    const updatedHistory: ITransaction[] = [
      ...history,
      {
        type: "deposit",
        amount: parsedAmount,
        date: new Date(),
      },
    ];
    await setUserDocument({
      balance: balance + +parsedAmount,
      history: updatedHistory,
    });
    onSuccess(balance + parsedAmount, updatedHistory);
    onClose();
  };

  const handleSubmit = () => {
    if (amount) {
      const { isValid, errorMessage } = validateAmount(amount);
      if (!isValid) {
        setError({ isError: true, message: errorMessage ?? "" });
      } else {
        setError({ isError: false, message: "" });

        const parsedAmount = parseFloat(amount);
        addToTransactionHistory(parsedAmount, balance, history);
      }
    }
  };

  const onModalClose = () => {
    setAmount("");
    onClose();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal open={open} onClose={onModalClose}>
      <div className={s.container}>
        <h1>Deposit some &#128184;</h1>
        <Input
          label={""}
          placeholder={"Enter amount"}
          type="text"
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
            disabled={!amount || error.isError}
          >
            Deposit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DepositModal;
