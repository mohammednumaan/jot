import { Toaster } from "react-hot-toast";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      {/* this is the layout's navigation component */}
      <Navigation />
      <div>
        <Toaster position="top-right" toastOptions={{duration: 2000}}/>
        <Outlet />
      </div>
    </>
  );
}
