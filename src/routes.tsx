import { createBrowserRouter } from "react-router";
import Login from "./ui/Form/AuthForm/LoginForm";
import Landing from "./ui/Landing/Landing";
import Signup from "./ui/Form/AuthForm/SignupForm";
import Discover from "./ui/Discover/Discover";
import ProtectedRoute from "./Protected";
import AuthProvider from "./core/context/auth.context";
import CreateJot from "./ui/CreateJot/CreateJot";
import NotFoundError from "./ui/Errors/NotFoundError";
import JotView from "./ui/JotView/JotView";
import PublicRoute from "./Public";
import Profile from "./ui/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />,
    children: [
      {
        path: "",
        element: (
          <PublicRoute>
            <Landing />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },

      {
        path: "/signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        )
      },

      {
        path: "/discover",
        element: (
          <ProtectedRoute>
            <Discover />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create",
        element: (
          <ProtectedRoute>
            <CreateJot />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/:name/:jotGroupId",
        element: (
          <ProtectedRoute>
            <JotView />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <NotFoundError />,
  },
  // },
]);

export default router;
