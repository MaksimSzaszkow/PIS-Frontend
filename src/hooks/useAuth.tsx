import { useState } from "react";
import { User } from "./types";

export function useAuth() {
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
    if (response.ok) {
      const data = await response.json();
      setCurrentUser(data);
      setData("");
    } else {
      setCurrentUser(null);
      setData("Error during login");
    }
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

  return { currentUser, data, login, logout, verifyAuth };
}
