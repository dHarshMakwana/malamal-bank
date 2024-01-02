import { ITransaction } from "@/lib/AuthContext.context";

export interface BalanceProps {
  balance: number;
}

export interface GreetProps {
  name: string;
}

export interface HistoryProps {
  history: ITransaction[];
}