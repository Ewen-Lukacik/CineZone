import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (!user) {
      addToast("You need to login first!", "error");
    } else if (adminOnly && user.role !== "admin") {
      addToast("You don't have the permissions for that.", "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role != "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
