import { createBrowserRouter } from "react-router";
import Login from "./ui/Form/AuthForm/LoginForm";
import Landing from "./ui/Landing/Landing";
import Signup from "./ui/Form/AuthForm/SignupForm";
import Discover from "./ui/Discover/Discover";
import ProtectedRoute from "./Protected";
import AuthProvider from "./core/context/auth.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path: "/discover",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Discover />,
          },
        ],
      },
    ],
  },
]);

export default router;
