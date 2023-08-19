import React, { useState } from "react";
import s from "./input.module.scss";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps {
  label: string;
  placeholder: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  type?: string;
  value?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  onChange,
  error = false,
  type = "text",
  value = "",
  name = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);  
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div
      className={`${s.inputWrapper} ${isFocused ? s.focused : ""} ${
        error ? s.error : ""
      }`}
    >
      <p className={s.label}>{label}</p>
      <input
        type={showPassword ? "text" : type}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={s.input}
        placeholder={placeholder}
        value={value}
        name={name}
      />
      {type === "password" && (
        <span className={s.passwordToggle} onClick={handleTogglePassword}>
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      )}
    </div>
  );
};

export default Input;
