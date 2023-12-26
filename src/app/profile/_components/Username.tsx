"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import { useAuth } from "@/lib/AuthContext.context";

const Username = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.name || "t5t");

  useEffect(() => {
    if (user?.name) {
      setUsername(user?.name);
    }
  }, [user]);

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
