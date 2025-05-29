import type { ReactNode } from "react"
import { useAuth  } from "./auth-context"
import { Navigate } from "react-router"

interface RequireAuthProps {
    children: ReactNode
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = useAuth();

  if (!auth.isLogged) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;