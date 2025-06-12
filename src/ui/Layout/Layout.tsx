import { Toaster } from "react-hot-toast";
import Navigation from "../Navigation/Navigation";

export default function Layout({children}: {children: React.ReactElement}) {
  return (
    <>
      {/* this is the layout's navigation component */}
      <Navigation />
      <div>
        <Toaster position="top-right" toastOptions={{duration: 2000}}/>
        {children}
      </div>
    </>
  );
}
