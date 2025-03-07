import Footer from "./components/footer";
import Navbar from "./components/navbar";
import EmNavbar from "./components/EmNavbar";
import JsNavbar from "./components/JsNavbar";
import { useAuthStore } from "./store/authStore";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const renderNavbar = () => {
    if (user?.role === "jobseeker") {
      return <JsNavbar />;
    } else if (user?.role === "employer") {
      return <EmNavbar />;
    } else {
      return <Navbar />;
    }
  };

  return (
    <>
      <main className="w-11/12 mx-auto my-[25px]">
        {location.pathname !== "/verify-email" && renderNavbar()}
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
