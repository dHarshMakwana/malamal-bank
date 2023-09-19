import Input from "@/components/Input";
import { useAuth } from "@/lib/AuthContext.context";
import React, { FC, useEffect, useRef, useState } from "react";
import Modal, { ModalProps } from "../Modal";
import s from "./modal.module.scss";
import { toast } from "react-hot-toast";

interface TransferProps extends ModalProps {
  onSuccessTransfer?: (newBalance: number, newHistory: object[]) => void;
}

const TransferModal: FC<TransferProps> = ({
  onClose,
  open,
  onSuccessTransfer,
}) => {
  const { handleTransferFunds } = useAuth();
  const [amount, setAmount] = useState<string>("");
  const [account, setAccount] = useState<string>();
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [accError, setAccError] = useState({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccError({
      isError: false,
      message: "",
    });
    setAccount(e.target.value);
  };

  const handleSubmit = () => {
    if (!amount) {
      return;
    }

    if (!account || account.toString().length > 15) {
      setAccError({
        isError: true,
        message: "The account number must be 15 characters",
      });
      return;
    }

    if (account.includes("e") || account.includes(".")) {
      setAccError({
        isError: true,
        message: "you can only add numbers to account number",
      });
    }
    if (accError.isError) {
      setAccount("");
      return;
    }

    handleTransferFunds(Number(account), Number(amount));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={s.container}>
        <h1>Transfer some &#128184;</h1>
        <Input
          label={"Account Number"}
          placeholder={"Enter account number"}
          type="number"
          onChange={handleInputChange}
          value={account}
          error={accError.isError}
          errorMessage={accError.message}
          autoFocus
        />
        <Input
          label={"Amount"}
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
            Tranfer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TransferModal;
