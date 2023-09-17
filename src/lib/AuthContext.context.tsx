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
import { setDoc, doc, getDoc, DocumentData } from "firebase/firestore";
import axios from "axios";

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
});
export const useAuth = () => useContext<AuthContextProps>(AuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | DocumentData | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      if (!auth.currentUser) {
        router.push("/");
        console.log("user nai hai");
      } else {
        console.log("user hai");
        const getData = async () => {
          if (auth.currentUser) {
            const id = auth.currentUser.uid;
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            setUser(docSnap.data() as User);
            console.log(user);
            console.log("user data", docSnap.data());
            console.log("getting user data");
          }
        };
        getData();
        console.log("hello");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  console.log("user dataaaaa", user);

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

    await setUserDocument({
      name: name,
      email: email,
      id: userData.user.uid,
      account: account,
      balance: 500,
      history: [],
      isVerified: userData.user.emailVerified,
      profilePicture: profilePicture.config.url,
    });

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
    await setUserDocument({
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
    setUserDocument({
      name: user.displayName,
      email: user.email,
      id: user.uid,
      account: account,
      balance: 500,
      history: [],
      isVerified: user.emailVerified,
      profilePicture: profilePicture.config.url,
    });
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

  const setUserDocument = async (dataToUpdate: Record<string, any>) => {
    const userId = user?.id;
    const userDocRef = doc(db, "users", userId);

    try {
      await setDoc(userDocRef, dataToUpdate, { merge: true });
      console.log(`Document for user ${userId} updated successfully!`);
    } catch (error) {
      console.error(`Error updating document for user ${userId}:`, error);
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
