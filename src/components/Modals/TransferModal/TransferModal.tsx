import Input from "@/components/Input";
import { User, useAuth } from "@/lib/AuthContext.context";
import React, { FC, useState } from "react";
import Modal from "../Modal";
import s from "./modal.module.scss";
import Image from "next/image";
import { TransferProps } from "../type";

const TransferModal: FC<TransferProps> = ({
  onClose,
  open,
  onSuccess,
}) => {
  const { handleTransferFunds, isAccountValid } = useAuth();
  const [amount, setAmount] = useState<string>("");
  const [account, setAccount] = useState<string>();
  const [isAccountCorrect, setIsAccountCorrect] = useState<boolean>(false);
  const [data, setData] = useState<User | null>();
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

  const checkAccount = async () => {
    const query = await isAccountValid(Number(account));
    setIsAccountCorrect(query.isValid);
    setData(query.data);
  };

  const handleSubmit = async () => {
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

    await handleTransferFunds(Number(account), Number(amount));
    onModalClose();
  };

  const onModalClose = () => {
    setAmount("");
    setAccount("");
    setIsAccountCorrect(false);
    setData(null);
    setError({
      isError: false,
      message: "",
    });
    setAccError({
      isError: false,
      message: "",
    });
    onClose();
  };

  const { account: accountNum, profilePicture, name } = data ?? {};

  return (
    <Modal open={open} onClose={onModalClose}>
      <div className={s.container}>
        <h1>Transfer some &#128184;</h1>
        {!isAccountCorrect ? (
          <>
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
            <div className={s.btnGroup}>
              <button
                onClick={checkAccount}
                className="btn-primary"
                disabled={!account || accError.isError}
              >
                Check
              </button>
            </div>
          </>
        ) : (
          <>
            {data && (
              <>
                <div className={s.profile}>
                  <Image
                    src={profilePicture as string}
                    alt={name as string}
                    width={60}
                    height={60}
                  />
                  <div className={s.profileDetails}>
                    <div className={s.name}>{name}</div>
                    <div>{accountNum}</div>
                  </div>
                </div>
              </>
            )}
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
          </>
        )}
      </div>
    </Modal>
  );
};

export default TransferModal;
