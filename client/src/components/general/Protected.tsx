import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

interface ProtectedProps {
  children: ReactNode;
}

// This component is used to protect routes that require authentication
function Protected({ children }: ProtectedProps) {
  const { isAuthenticated, isLoading: isUserDataLoading } = useSelector(
    (state: RootState) => state.user
  );

  if (isUserDataLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
}

export default Protected;
