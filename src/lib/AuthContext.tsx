import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/firebase";

export const AuthContext = createContext<any>({});

const googleAuth = new GoogleAuthProvider();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // console.log(user);

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  useEffect(() => {
    unsubscribe();
    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return console.log(user);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = async () => {
    return await signInWithPopup(auth, googleAuth);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth).catch((error) => console.log(error));
    console.log(user);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, googleLogin }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
