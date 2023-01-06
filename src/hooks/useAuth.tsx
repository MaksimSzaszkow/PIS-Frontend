import { useState } from "react";
import { User } from "./types";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState("");

  const login = async (user: User) => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data);
      localStorage.setItem("user", data.access_token);
      setData("");
    } else {
      setUser(null);
      setData("Error during login");
    }
  };

  const logout = () => {
    setUser(null);
    setData("");
  };

  return { user, login, logout };
}
