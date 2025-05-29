import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  isLogged: false,
  onLogin: () => {},
  onLogout: () => {}
});


export function useAuth() {
  const authValue = useContext(AuthContext)
  return authValue;
}