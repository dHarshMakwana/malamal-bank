import React, { useState } from "react";
import s from "./input.module.scss";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { InputProps } from "./type";

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
  readOnly = false,
  maxLength,
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
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={s.input}
        placeholder={placeholder}
        value={value}
        name={name}
        ref={inputRef}
        autoFocus={autoFocus}
        readOnly={readOnly}
        maxLength={maxLength}
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
