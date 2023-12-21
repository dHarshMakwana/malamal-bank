"use client";
import Input from "@/components/Input";
import { useAuth } from "@/lib/AuthContext.context";
import useLocalStorage from "@/utils/useLocalStorage";
import React from "react";

const Username = () => {
  const { user } = useAuth();
  const [username, setUsername] = useLocalStorage("username", user?.name || "");

  return (
    <div>
      <Input
        label={"Username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
};

export default Username;
