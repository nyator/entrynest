import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <main className="w-11/12 mx-auto my-[25px]">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default Layout;
