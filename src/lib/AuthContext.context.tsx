"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { useRouter } from "next/navigation";
import {
  setDoc,
  doc,
  getDoc,
  DocumentData,
  collection,
  query,
  where,
  getDocs,
  increment,
  arrayUnion,
} from "firebase/firestore";
import axios from "axios";
import { toast } from "react-hot-toast";

interface AuthContextProps {
  user: User | DocumentData | null;
  setUser: Dispatch<SetStateAction<User | DocumentData>>;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    account: number
  ) => Promise<void>;
  logout: () => void;
  googleLogin: (account: number) => Promise<void>;
  githubLogin: (account: number) => Promise<void>;
  checkPin: (pin: string) => boolean;
  setUserDocument: (dataToUpdate: Record<string, any>) => Promise<void>;
  handleTransferFunds: (
    reciverAccount: number,
    amount: number
  ) => Promise<void>;
  isAccountValid: (reciverAccount: number) => Promise<{
    data: any;
    isValid: boolean;
  }>;
}

export interface User {
  name: string;
  email: string;
  id: string;
  account: number;
  balance: number;
  history: any[];
  isVerified: boolean;
  pin: null | string;
  profilePicture: string;
}
export const value = {
  account: "",
  balance: 0,
  email: "",
  history: [],
  id: "",
  isVerified: false,
  name: "",
  pin: null,
  profilePicture: "",
};

export const AuthContext = createContext<AuthContextProps>({
  user: value,
  setUser: setUser,
  login: async (email: string, password: string) => {},
  signup: async (
    email: string,
    password: string,
    name: string,
    account: number
  ) => {},
  logout: () => {},
  googleLogin: async (account: number) => {},
  githubLogin: async (account: number) => {},
  checkPin: (pin: string) => false,
  setUserDocument: async (dataToUpdate: Record<string, any>) => {},
  handleTransferFunds: async (reciverAccount, amount) => {},
  isAccountValid: async (receiverAccount) => {
    const isValid = false;
    const data = {};
    return { data, isValid };
  },
});
export const useAuth = () => useContext<AuthContextProps>(AuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      if (!auth.currentUser) {
        router.push("/");
      } else {
        const getData = async () => {
          if (auth.currentUser) {
            const id = auth.currentUser.uid;
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            setUser(docSnap.data() as User);
          }
        };
        getData();
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signup = async (
    email: string,
    password: string,
    name: string,
    account: number
  ) => {
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const profilePicture = await axios.get(
      `https://api.multiavatar.com/${account}.png?apikey=O8yIjl9JkQD60v`
    );

    await setUserDocument(
      {
        name: name,
        email: email,
        id: userData.user.uid,
        account: account,
        balance: 500,
        history: [],
        isVerified: userData.user.emailVerified,
        profilePicture: profilePicture.config.url,
      },
      userData.user.uid
    );

    setUser({
      name: name,
      email: email,
      id: userData.user.uid,
      account: account,
      balance: 500,
      history: [],
      isVerified: userData.user.emailVerified,
      profilePicture: profilePicture.config.url,
    });

    router.push("/settings");
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        const id = user.user.uid;
        const docRef = doc(db, "users", id);
        getDoc(docRef).then((doc) => {
          setUser(doc.data() as DocumentData);
        });
      })
      .then(() => {
        if (user?.pin) {
          router.push("/home");
        } else {
          router.push("/settings");
        }
      });
  };

  const googleLogin = async (account: number) => {
    const userData = await signInWithPopup(auth, googleProvider);
    const user = userData.user;
    const profilePicture = await axios.get(
      `https://api.multiavatar.com/${account}.png?apikey=O8yIjl9JkQD60v`
    );
    await setUserDocument(
      {
        name: user.displayName,
        email: user.email,
        id: user.uid,
        account: account,
        balance: 500,
        history: [],
        isVerified: user.emailVerified,
        profilePicture: profilePicture.config.url,
      },
      user.uid
    );
    router.push("/settings");
    setUser({
      name: user.displayName,
      email: user.email,
      id: user.uid,
      account: account,
      balance: 500,
      history: [],
      isVerified: user.emailVerified,
      profilePicture: profilePicture.config.url,
    });
  };

  const githubLogin = async (account: number) => {
    const userData = await signInWithPopup(auth, githubProvider);
    const user = userData.user;
    const profilePicture = await axios.get(
      `https://api.multiavatar.com/${account}.png?apikey=O8yIjl9JkQD60v`
    );
    setUserDocument(
      {
        name: user.displayName,
        email: user.email,
        id: user.uid,
        account: account,
        balance: 500,
        history: [],
        isVerified: user.emailVerified,
        profilePicture: profilePicture.config.url,
      },
      user.uid
    );
    setUser({
      name: user.displayName,
      email: user.email,
      id: user.uid,
      account: account,
      balance: 500,
      history: [],
      isVerified: user.emailVerified,
      profilePicture: profilePicture.config.url,
    });
    router.push("/settings");
  };

  const checkPin = (enteredPin: string) => {
    if (user && user.pin === enteredPin) {
      return true;
    } else {
      return false;
    }
  };

  const setUserDocument = async (
    dataToUpdate: Record<string, any>,
    userID?: string
  ) => {
    const userId = userID ?? user?.id;
    const userDocRef = doc(db, "users", userId);

    try {
      await setDoc(userDocRef, dataToUpdate, { merge: true });
    } catch (error) {
      console.error(error);
    }
  };

  const isAccountValid = async (receiverAccount: number) => {
    const q = query(
      collection(db, "users"),
      where("account", "==", receiverAccount)
    );
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        toast.error("No account found for the provided account number");
        return { data: null, isValid: false };
      }
      const docData = querySnapshot.docs.map((doc) => doc.data());
      return { data: docData[0], isValid: true };
    } catch (error) {
      console.error("Error querying Firestore:", error);
      throw error;
    }
  };

  const handleTransferFunds = async (
    reciverAccount: number,
    amount: number
  ) => {
    const q = query(
      collection(db, "users"),
      where("account", "==", reciverAccount)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length === 0) {
        toast.error("No account found for the provided account number");
        return;
      }
      const docData = querySnapshot.docs.map((doc) => doc.data());

      // Transfer logic

      if (amount > user?.balance) {
        toast.error("insufficient funds");
      } else {
        await setUserDocument({
          balance: increment(-amount),
          history: arrayUnion({
            amount: amount,
            date: new Date(),
            type: "transfer out",
            to: reciverAccount,
          }),
        });
        setUser({
          ...user,
          balance: user?.balance - amount,
          history: [
            ...user?.history,
            { amount: amount, date: new Date(), type: "transfer out" },
          ],
        });
        await setUserDocument(
          {
            balance: increment(amount),
            history: arrayUnion({
              amount: amount,
              date: new Date(),
              type: "transfer in",
              from: reciverAccount,
            }),
          },
          docData[0].id
        );
        toast.success("Transfer completed successfully");
      }
    } catch (error) {
      console.error("Error querying Firestore:", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth).catch((error) => console.log(error));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        logout,
        googleLogin,
        githubLogin,
        checkPin,
        setUserDocument,
        handleTransferFunds,
        isAccountValid,
      }}
    >
      {loading ? (
        <>
          <h1 className="green-text">Loading</h1>
        </>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
function setUser(value: SetStateAction<User | DocumentData>): void {}
