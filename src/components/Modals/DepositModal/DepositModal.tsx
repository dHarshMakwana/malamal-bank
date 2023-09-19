import React, { FC, useEffect, useRef, useState } from "react";
import Modal, { ModalProps } from "../Modal";
import Input from "@components/Input";
import s from "./modal.module.scss";
import { useAuth } from "@/lib/AuthContext.context";

interface DepositProps extends ModalProps {
  balance: number;
  history: object[];
  onSuccessDeposit: (newBalance: number, newHistory: object[]) => void;
}

const DepositModal: FC<DepositProps> = ({
  onClose,
  open,
  balance,
  history,
  onSuccessDeposit,
}) => {
  const { setUserDocument } = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [amount, setAmount] = useState<string>(""); // Change to string type
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

  const handleSubmit = () => {
    if (amount) {
      const parsedAmount = parseFloat(amount);
      if (parsedAmount > 50000 || parsedAmount < 0) {
        setError({
          isError: true,
          message: "You can't deposit more than 50000 or less than 0.",
        });
      } else {
        setError({ isError: false, message: "" });
        setUserDocument({
          balance: balance + parsedAmount,
          history: [
            ...history,
            {
              type: "deposit",
              amount: parsedAmount,
              date: new Date(),
            },
          ],
        }).then(() => {
          onSuccessDeposit(balance + parsedAmount, [
            ...history,
            {
              type: "deposit",
              amount: parsedAmount,
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
