import React from "react";
import { Link } from "react-router";

import { logo } from "../constants/assests";

// const navLinks = [
//   { title: "Services", href: "/#services", id: 1 },
//   { title: "About Us", href: "/#about", id: 2 },
//   { title: "Portfolio", href: "/portfolio", id: 3 },
// ];

const Navbar = () => {
  return (
    <>
      <div>
        <Link to={"/"}>
          <img src={logo} alt="" className="" />
        </Link>
      </div>
    </>
  );
};

export default Navbar;
