import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { apiGetRequest } from "../utils/request.utils";
import { IAuthenticationStatusResponse } from "../types/auth/login.types";
import { ApiErrorResponse, ApiSucessResponse } from "../types/api/response";

interface ProviderState {
  isAuthenticated: boolean;
  username: string | null;
}
interface ProviderProps {
  username: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  setAuth: React.Dispatch<React.SetStateAction<ProviderState>>;
}

const AuthContext = createContext<ProviderProps>({
  username: null,
  isAuthenticated: false,
  loading: true,
  setAuth: () => {},
});

export default function AuthProvider() {
  const [auth, setAuth] = useState<ProviderState>({
    isAuthenticated: false,
    username: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserAuthenticationStatus() {
      try {
        setLoading(true);
        const response = await apiGetRequest<
          ApiErrorResponse | ApiSucessResponse<IAuthenticationStatusResponse>
        >("auth/status");
        if (response.success) {
          setAuth({
            isAuthenticated: response.data.status,
            username: response.data.username,
          });
        }
      } finally {
        setLoading(false);
      }
    }

    if (!auth.isAuthenticated) fetchUserAuthenticationStatus();
  }, [auth.isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        username: auth.username,
        loading,
        setAuth,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
