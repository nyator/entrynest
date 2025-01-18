import Footer from "./components/footer";
import Navbar from "./components/navbar";

import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      <main className="w-11/12 mx-auto my-[25px]">
        <Navbar />
        <Outlet />
        {location.pathname !== "/join_login" &&
          location.pathname !== "/join_signup" && <Footer />}
      </main>
    </>
  );
};

export default Layout;
