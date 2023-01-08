import { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../config/firebase-config";
import User from "../types/User";

export const defaultUser = {
  email: "",
  role: "",
  authorized: false,
};

export function useAuth() {
  const [user, setUser] = useState<User>(defaultUser);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(getAuth(app), async (user) => {
      setLoading(false);
      if (user) {
        setUser({
          email: user.email || "",
          role: (await user.getIdTokenResult()).claims.role,
          authorized: true,
        });
        const firebaseToken = await user.getIdToken();
        const res = await fetch("http://localhost:8080/firebase/auth", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + firebaseToken,
          },
        });

        if (res.ok) {
          const { token } = await res.json();

          setToken(token);
        } else {
          console.log("Login error");
          await logout();
        }
      } else setUser(defaultUser);
    });
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getAuth(app), email, password);
    } catch (err) {
      console.log("Login error");
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(getAuth(app), email, password);
    } catch (err) {
      console.log("Register error");
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(getAuth(app));
    } catch (err) {
      console.log("Logout error");
    }
  };

  return { user, loading, token, login, register, logout };
}
