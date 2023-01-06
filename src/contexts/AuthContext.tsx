import { createContext, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext<{
  user: any;
  logout: Function;
  login: Function;
}>({
  user: null,
  logout: () => {},
  login: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={{ ...auth }}>{children}</AuthContext.Provider>
  );
}
