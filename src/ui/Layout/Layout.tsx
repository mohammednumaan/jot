import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      {/* this is the layout's navigation component */}
      <Navigation />
      <div>
        <Outlet />
      </div>
    </>
  );
}
