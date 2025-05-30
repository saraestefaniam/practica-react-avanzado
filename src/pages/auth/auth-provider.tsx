import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";
import { removeAuthorizationHeader, setAuthorizationHeader } from "../../api/client";
import storage from "../../utils/storage";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState(() => {
    return !!storage.get("auth")
  });

  useEffect(() => {
    if (isLogged) {
      const token = storage.get("auth")
      if (token) {
        setAuthorizationHeader(token)
      }
    } else {
      removeAuthorizationHeader();
    }
  }, [isLogged])

  //const [isLoading, setIsLoading] = useState(true)

  /*useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")
    if (token) {
      setAuthorizationHeader(token)
      setIsLogged(true)
    } else {
      removeAuthorizationHeader()
    }
    setIsLoading(false)
  }, [])*/

  const handleLogin = () => setIsLogged(true)

  const handleLogout = () => {
    setIsLogged(false)
    storage.remove("auth")
    removeAuthorizationHeader()
  }

  /*if (isLoading) return <div>Checking session...</div>*/

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
