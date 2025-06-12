import { Navigate } from "react-router";
import { useAuth } from "./core/context/auth.context";

export default function PublicRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <></>;
  }
  return isAuthenticated ? (
    <Navigate to="/discover" replace={true} />
  ) : (
    children
  );
}
