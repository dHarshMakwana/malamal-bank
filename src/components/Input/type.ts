export interface InputProps {
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
  maxLength?: number;
  readOnly?: boolean;
}
