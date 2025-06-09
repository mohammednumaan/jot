import { Navigate } from "react-router";
import { useAuth } from "./core/context/auth.context";
import Layout from "./ui/Layout/Layout";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <></>;
  }
  return isAuthenticated ? <Layout /> : <Navigate to="/login" replace={true} />;
}
