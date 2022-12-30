import { createContext, ReactNode, useState } from "react";
import { User } from "./types";

export const AuthContext = createContext<{
  currentUser: any;
  data: string;
  logout: Function;
  verifyAuth: Function;
  login: Function;
}>({
  currentUser: null,
  data: "",
  logout: () => {},
  verifyAuth: () => {},
  login: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [data, setData] = useState("");

  const login = async (user: User) => {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    setCurrentUser(data);
    setData("");
  };

  const logout = () => {
    setCurrentUser(null);
    setData("");
  };

  const verifyAuth = async () => {
    const response = await fetch("/verify-auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    });
    if (response.ok) setData(await response.text());
    else setData("Unauthorized");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, data, login, logout, verifyAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
