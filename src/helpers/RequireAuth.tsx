import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

export interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const jwt = useSelector((state: RootState) => state.user.jwt);

  if (!jwt) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
