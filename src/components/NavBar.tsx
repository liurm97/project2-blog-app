import React from "react";
import { Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="bg-gray-700 py-6 px-14">Navbar Placeholder</div>
      <Outlet />
    </>
  )
};
export default NavBar;
