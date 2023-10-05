"use client";
import Input from "@/components/Input/Input";
import { useAuth } from "@/lib/AuthContext.context";
import React from "react";

const AccountNumber = () => {
  const { user } = useAuth();

  return (
    <div>
      <Input
        label={"Account Number"}
        type="number"
        value={user?.account}
        readOnly
      />
    </div>
  );
};

export default AccountNumber;
