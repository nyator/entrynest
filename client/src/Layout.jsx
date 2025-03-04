import Footer from "./components/footer";
import Navbar from "./components/navbar";
import EmNavbar from "./components/EmNavbar";

import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <main className="w-11/12 mx-auto my-[25px]">
        {location.pathname !== "/verify-email" && <EmNavbar />}
        <Outlet />
        {location.pathname !== "/login" &&
          location.pathname !== "/signup" &&
          location.pathname !== "/verify-email" && <Footer />}
      </main>
    </>
  );
};

export default Layout;
