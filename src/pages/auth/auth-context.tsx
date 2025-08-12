import { createContext, useContext } from "react";

interface AuthContextType {
  isLogged: boolean;
  onLogin: (token: string, remember: boolean) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  onLogin: () => {},
  onLogout: () => {}
});


export function useAuth() {
  const authValue = useContext(AuthContext)
  return authValue;
}