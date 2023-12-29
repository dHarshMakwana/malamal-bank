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
import Loader from "@/components/Loader";

interface IAuthenticationService {
  user: User | DocumentData | null;
  setUser: Dispatch<SetStateAction<User | DocumentData>>;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    account: number
  ) => Promise<void>;
  logOut: () => void;
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
  isUser: () => boolean;
}

interface ITransaction {
  amount: number;
  date: Date;
  type: string;
  to?: number;
  from?: number;
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

const dummyAsyncFunction: (...args: any[]) => Promise<void> = async () => {};

const checkPinDummy: (pin: string) => boolean = (pin) => false;

const isUserDummy: () => boolean = () => false;

const isAccountValidDummy: (
  account: number
) => Promise<{ data: Record<string, any>; isValid: boolean }> = async () => ({
  data: {},
  isValid: false,
});

export const AuthContext = createContext<IAuthenticationService>({
  user: value,
  setUser: dummyAsyncFunction,
  login: dummyAsyncFunction,
  signup: dummyAsyncFunction,
  logOut: dummyAsyncFunction,
  googleLogin: dummyAsyncFunction,
  githubLogin: dummyAsyncFunction,
  checkPin: checkPinDummy,
  setUserDocument: dummyAsyncFunction,
  handleTransferFunds: dummyAsyncFunction,
  isAccountValid: isAccountValidDummy,
  isUser: isUserDummy,
});
export const useAuth = () => useContext<IAuthenticationService>(AuthContext);

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
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!firebaseUser) {
        toast.error("Failed to create user");
      }

      let profilePictureUrl: string;
      try {
        const profilePicture = await axios.get(
          `https://api.multiavatar.com/${account}.png?apikey=O8yIjl9JkQD60v`
        );
        profilePictureUrl = profilePicture.config.url || "";
      } catch (error) {
        console.error("Failed to fetch profile picture:", error);
        profilePictureUrl = "";
      }

      const config: User = {
        name,
        email,
        id: firebaseUser.uid,
        account,
        balance: 500,
        history: [],
        isVerified: firebaseUser.emailVerified,
        pin: null,
        profilePicture: profilePictureUrl,
      };

      await setUserDocument(config, firebaseUser.uid);
      setUser(config);
      router.push("/settings");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (firebaseUser) {
        const id = firebaseUser.uid;
        const docRef = doc(db, "users", id);
        const docData = await getDoc(docRef);

        if (docData.exists()) {
          const userData = docData.data() as DocumentData;
          setUser(userData);

          if (userData?.pin) {
            router.push("/home");
          } else {
            router.push("/settings");
          }
        } else {
          console.log("No such user found.");
          toast.error("No such user");
        }
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  // KEY: google and github login from here is used only in sign in NOT FOR LOGIN

  const googleLogin = async (account: number) => {
    const userData = await signInWithPopup(auth, googleProvider);
    const user = userData.user;
    const profilePicture = await axios.get(
      `https://api.multiavatar.com/${account}.png?apikey=O8yIjl9JkQD60v`
    );

    const config = {
      name: user.displayName,
      email: user.email,
      id: user.uid,
      account: account,
      balance: 500,
      history: [],
      isVerified: user.emailVerified,
      profilePicture: profilePicture.config.url,
    };

    setUserDocument(config, user.uid);
    setUser(config);

    router.push("/settings");
  };

  const githubLogin = async (account: number) => {
    const userData = await signInWithPopup(auth, githubProvider);
    const user = userData.user;
    const profilePicture = await axios.get(
      `https://api.multiavatar.com/${account}.png?apikey=O8yIjl9JkQD60v`
    );

    const config = {
      name: user.displayName,
      email: user.email,
      id: user.uid,
      account: account,
      balance: 500,
      history: [],
      isVerified: user.emailVerified,
      profilePicture: profilePicture.config.url,
    };

    setUserDocument(config, user.uid);
    setUser(config);
    router.push("/settings");
  };

  const checkPin = (enteredPin: string) => {
    if (!user) {
      return false;
    }
    return user.pin === enteredPin;
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
      console.error("Error updating user document:", error);
    }
  };

  const isAccountValid = async (receiverAccount: number) => {
    const accountQuery = query(
      collection(db, "users"),
      where("account", "==", receiverAccount)
    );
    try {
      const querySnapshot = await getDocs(accountQuery);

      if (!querySnapshot || querySnapshot.empty) {
        toast.error("No User found");
        throw new Error("No account found for the provided account number");
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
    const accountQuery = query(
      collection(db, "users"),
      where("account", "==", reciverAccount)
    );

    try {
      const querySnapshot = await getDocs(accountQuery);
      if (querySnapshot.docs.length === 0) {
        toast.error("No account found for the provided account number");
        return;
      }

      const receiverData = querySnapshot.docs.map((doc) => doc.data());

      if (!user || amount > user.balance) {
        toast.error("Insufficient funds");
        return;
      }

      const outgoingTransaction: ITransaction = {
        amount: amount,
        date: new Date(),
        type: "transfer out",
        to: reciverAccount,
      };

      const incomingTransaction: ITransaction = {
        amount: amount,
        date: new Date(),
        type: "transfer in",
        from: user.account,
      };

      await setUserDocument({
        balance: increment(-amount),
        history: arrayUnion(outgoingTransaction),
      });

      await setUserDocument(
        {
          balance: increment(amount),
          history: arrayUnion(incomingTransaction),
        },
        receiverData[0].id
      );

      // If you need to update the user object in the state or elsewhere
      const updatedUser = {
        ...user,
        balance: user.balance - amount,
        history: [...user.history, outgoingTransaction],
      };

      setUser(updatedUser);

      toast.success("Transfer completed successfully");
    } catch (error) {
      console.error("Error querying Firestore:", error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("logged out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error('"Error signing out');
    }
  };

  const isUser = (): boolean => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        logOut,
        googleLogin,
        githubLogin,
        checkPin,
        setUserDocument,
        handleTransferFunds,
        isAccountValid,
        isUser,
      }}
    >
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
