import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

export interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
