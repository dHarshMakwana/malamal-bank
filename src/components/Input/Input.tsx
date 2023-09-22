import React, { useState } from "react";
import s from "./input.module.scss";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps {
  label: string;
  placeholder?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  type?: "text" | "password" | "pin" | "number";
  value?: string | number;
  name?: string;
  errorMessage?: string;
  inputRef?: any;
  autoFocus?: boolean;
  maxLength?: number; // Add maxLength property
  readOnly?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  onChange,
  error = false,
  type = "text",
  value = "",
  name = "",
  errorMessage = "",
  inputRef = null,
  autoFocus = false,
  readOnly = false
  // maxLength = 4, // Set the default maxLength to 4 for "pin" type
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "pin") {
      const inputValue = e.target.value.replace(/\D/g, "").slice(0, 4);
      e.target.value = inputValue;
    }
    onChange?.(e);
  };

  return (
    <div
      className={`${s.inputWrapper} ${isFocused ? s.focused : ""} ${
        error ? s.error : ""
      }`}
    >
      <p className={s.label}>{label}</p>
      <input
        type={showPassword ? "text" : type == "pin" ? "password" : type}
        onChange={handleChange} // Use the handleChange function
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={s.input}
        placeholder={placeholder}
        value={value}
        name={name}
        ref={inputRef}
        autoFocus={autoFocus}
        readOnly={readOnly}
      />
      {error && <p className={s.labelError}>{errorMessage}</p>}
      {type === "password" || type === "pin" ? (
        <span className={s.passwordToggle} onClick={handleTogglePassword}>
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
