import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ProtectedProps {
  children: ReactNode;
}

// This component is used to protect routes that require authentication (Bookmarks page)
function Protected({ children }: ProtectedProps) {
  // const { isAuthenticated } = useSelector((state) => state.user);
  const isAuthenticated = true; //TODO:

  const navigate = useNavigate();

  // If user is not authenticated, redirect to login page
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access Bookmarks");
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // While redirecting, don't render children
  if (!isAuthenticated) {
    return null;
  }

  // If user is authenticated, render children
  return <>{children}</>;
}

export default Protected;
