import Footer from "./components/footer";
import Navbar from "./components/navbar";
import EmNavbar from "./components/EmNavbar";
import JsNavbar from "./components/JsNavbar";
import AdminNavbar from "./components/AdminNavbar";
import MtNavbar from "./components/MtNavbar";
import { useAuthStore } from "./store/authStore";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const location = useLocation();
  const { user } = useAuthStore(); // Get the user state
  const [currentNavbar, setCurrentNavbar] = useState(null);

  useEffect(() => {
    // Dynamically update the navbar based on the user's role
    if (user?.role === "jobseeker") {
      setCurrentNavbar(<JsNavbar />);
    } else if (user?.role === "employer") {
      setCurrentNavbar(<EmNavbar />);
    } else if (user?.role === "admin") {
      setCurrentNavbar(<AdminNavbar />);
    } else if (user?.role === "mentor") {
      setCurrentNavbar(<MtNavbar />);
    } else {
      setCurrentNavbar(<Navbar />);
    }
  }, [user]); // Re-run whenever the user state changes

  return (
    <>
      <main className="w-11/12 mx-auto my-[25px]">
        {location.pathname !== "/verify-email" && currentNavbar}
        <Outlet />
        {location.pathname !== "/login" &&
          location.pathname !== "/signup" &&
          location.pathname !== "/verify-email" &&
          location.pathname !== "/forgot-password" && <Footer />}
      </main>
    </>
  );
};

export default Layout;
