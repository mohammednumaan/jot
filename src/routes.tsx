import { createBrowserRouter } from "react-router";
import Login from "./ui/Form/AuthForm/LoginForm";
import Landing from "./ui/Landing/Landing";
import Signup from "./ui/Form/AuthForm/SignupForm";
import Discover from "./ui/Discover/Discover";
import ProtectedRoute from "./Protected";
import AuthProvider from "./core/context/auth.context";
import CreateJot from "./ui/CreateJot/CreateJot";
import NotFoundError from "./ui/Errors/NotFoundError";

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
        path: "/client",
        element: <ProtectedRoute />,
        children: [
          {
            path: "discover",
            element: <Discover />,
          },
          {
            path: "create",
            element: <CreateJot />,
          },
        ],
      },
    ],
    errorElement: <NotFoundError />
  },
]);

export default router;
