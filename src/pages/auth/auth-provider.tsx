import { useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";
import { removeAuthorizationHeader, setAuthorizationHeader } from "../../api/client";
import storage from "../../utils/storage";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const token = storage.get("auth");
  if (token) {
    setAuthorizationHeader(token)
  }
  
  const [isLogged, setIsLogged] = useState(!!token)

  const handleLogin = (token: string, remember: boolean) => {
    setIsLogged(true)

    if (remember) {
      storage.set("auth", token)
    }

    setAuthorizationHeader(token)
  }

  const handleLogout = () => {
    setIsLogged(false)
    storage.remove("auth")
    removeAuthorizationHeader()
  }

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
