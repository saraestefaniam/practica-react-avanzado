import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";
import { setAuthorizationHeader } from "../../api/client";

interface AuthProviderProps {
  defaultIsLogged: boolean;
  children: ReactNode;
}

function AuthProvider({ defaultIsLogged, children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  function handleLogin() {
    setIsLogged(true);
  }

  function handleLogout() {
    setIsLogged(false);
    localStorage.removeItem("token")
    sessionStorage.removeItem("token")
  }

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")
    if (token) {
      setAuthorizationHeader(token)
      setIsLogged(true)
    }
  }, [])

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
