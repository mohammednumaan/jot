import { Navigate } from "react-router";
import { useAuth } from "./core/context/auth.context";
import Layout from "./ui/Layout/Layout";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Layout /> : <Navigate to="/" replace={true} />;
}
