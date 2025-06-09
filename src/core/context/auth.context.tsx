import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { apiGetRequest } from "../utils/request.utils";
import { IAuthenticatedStatus } from "../types/auth/login.types";
import { ApiErrorResponse, ApiSucessResponse } from "../types/api/response";

interface ProviderProps {
  isAuthenticated: boolean;
  loading: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<ProviderProps>({
  isAuthenticated: false,
  loading: true,
  setIsAuthenticated: () => {},
});

export default function AuthProvider() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function fetchUserAuthenticationStatus() {

      try{
        setLoading(true)
        const response = await apiGetRequest<
          ApiErrorResponse | ApiSucessResponse<IAuthenticatedStatus>
        >("auth/status");
        if (response.success) {
          setIsAuthenticated(response.data.status);
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserAuthenticationStatus();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, setIsAuthenticated }}>
      <Outlet />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
