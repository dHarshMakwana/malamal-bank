"use client";
import Input from "@/components/Input";
import React, { useState } from "react";

const Username = () => {
  const [username, setUsername] = useState("");
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
