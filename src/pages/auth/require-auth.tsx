import type { ReactNode } from "react"
//import { useAuth  } from "./auth-context"
import { Navigate } from "react-router-dom"
import { useAuth as useAuthHook } from "../../store/hooks"
import { useLocation } from "react-router-dom";

interface RequireAuthProps {
    children: ReactNode
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const isLogged = useAuthHook();
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;