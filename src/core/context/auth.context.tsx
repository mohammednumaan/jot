import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { apiGetRequest } from "../utils/request.utils";
import { IAuthenticatedStatus } from "../types/auth/login.types";
import { ApiErrorResponse, ApiSucessResponse } from "../types/api/response";

interface ProviderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<ProviderProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});


export default function AuthProvider() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchUserAuthenticationStatus() {
      const response = await apiGetRequest<
        ApiErrorResponse | ApiSucessResponse<IAuthenticatedStatus>
      >("auth/status");
      if (response.success) {
        setIsAuthenticated(response.data.status);
        navigate("/client/discover");
      }
    }

    fetchUserAuthenticationStatus();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Outlet />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
