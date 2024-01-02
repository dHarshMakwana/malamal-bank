import { ITransaction } from "@/lib/AuthContext.context";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

interface TransactionProps extends ModalProps {
  balance: number;
  history: ITransaction[];
  onSuccess: (newBalance: number, newHistory: ITransaction[]) => void;
}

export interface WithdrawProps extends TransactionProps {
  userId: string;
}

export type DepositProps = TransactionProps;

export type TransferProps = ModalProps & Partial<TransactionProps>;
