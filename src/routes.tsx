import { createBrowserRouter } from "react-router";
import Login from "./ui/Form/AuthForm/LoginForm";
import Landing from "./ui/Landing/Landing";
import Signup from "./ui/Form/AuthForm/SignupForm";


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
