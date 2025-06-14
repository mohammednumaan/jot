import { Navigate } from "react-router";
import { useAuth } from "./core/context/auth.context";
import Layout from "./ui/Layout/Layout";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) { 
    return <></>;
  }
  return isAuthenticated ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
