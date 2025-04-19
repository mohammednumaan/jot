import { createBrowserRouter } from "react-router";
import Landing from "../components/Landing/Landing";
import Login from "../components/Form/AuthForm/LoginForm";
import Signup from "../components/Form/AuthForm/SignupForm";

const router = createBrowserRouter([
  {
    path: "/",
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
]);

export default router;
