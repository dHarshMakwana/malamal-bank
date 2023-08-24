"use client";
import { createContext, useContext, useEffect, useState } from "react";
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

export const AuthContext = createContext<any>({});
export const useAuth = () => useContext(AuthContext);

interface User {
  name: string;
  email: string;
  id: string;
  account: number;
  balance: number;
  history: any[];
  isVerified: boolean;
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null | DocumentData>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const id = user.uid;
      const docRef = doc(db, "users", id);
      // getDoc(docRef).then((doc) => {
      //   console.log("dataaahjka", doc.data());
      //   setUser(doc.data() as DocumentData);
      // });
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  useEffect(() => {
    unsubscribe();
    return () => unsubscribe();
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
    await setDoc(doc(db, "users", userData.user.uid), {
      name: name,
      email: email,
      id: userData.user.uid,
      account: account,
      balance: 500,
      history: [],
      isVerified: userData.user.emailVerified,
    });

    setUser({
      name: name,
      email: email,
      id: userData.user.uid,
      account: account,
      balance: 500,
      history: [],
      isVerified: userData.user.emailVerified,
    });

    router.push("/home");
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        const id = user.user.uid;
        const docRef = doc(db, "users", id);
        getDoc(docRef).then((doc) => {
          console.log("dataaaa", doc.data());
          setUser(doc.data() as DocumentData);
        });
      })
      .then(() => router.push("/home"));
  };

  const googleLogin = async (account: number) => {
    const userData = await signInWithPopup(auth, googleProvider);
    const user = userData.user;
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      id: user.uid,
      account: account,
      balance: 500,
      history: [],
      isVerified: user.emailVerified,
    });
    router.push("/home");
  };

  const githubLogin = async (account: number) => {
    const userData = await signInWithPopup(auth, githubProvider);
    const user = userData.user;
    setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      id: user.uid,
      account: account,
      balance: 500,
      history: [],
      isVerified: user.emailVerified,
    });
    router.push("/home");
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth).catch((error) => console.log(error));
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, signup, logout, googleLogin, githubLogin }}
    >
      {loading ? children : children}
    </AuthContext.Provider>
  );
};
