// Input.tsx
import React, { useState } from "react";
import s from "./input.module.scss";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps {
  label: string; // New prop for the label
  placeholder: string;
  onChange: (value: string) => void;
  error?: boolean;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  onChange,
  error,
  type = "text",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

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
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={s.input}
        placeholder={placeholder}
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
