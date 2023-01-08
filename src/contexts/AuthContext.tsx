import { createContext, ReactNode } from "react";
import { defaultUser, useAuth } from "../hooks/useAuth";

export const AuthContext = createContext<ReturnType<typeof useAuth>>({
  user: defaultUser,
  loading: true,
  token: "",
  logout: async () => {},
  login: async (email, password) => {},
  register: async (email, password) => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={{ ...auth }}>{children}</AuthContext.Provider>
  );
}
