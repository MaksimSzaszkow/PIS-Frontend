import { createContext, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

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
  const auth = useAuth();

  return (
    <AuthContext.Provider value={{ ...auth }}>{children}</AuthContext.Provider>
  );
}
