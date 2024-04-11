import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { Avatar } from "@chakra-ui/react";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });
  });

  return (
    <>
      <nav
        className={`py-6 px-16 fixed flex top-0 ${
          isLoggedIn ? "justify-end" : "justify-between backdrop-blur-sm z-1"
        } items-center w-full z-1`}
      >
        {!isLoggedIn && (
          <NavLink to={`/`} className="text-white hover:text-white">
            Home
          </NavLink>
        )}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <NavLink
              to={`/profiles/${auth.currentUser!.uid}/dashboard`}
              className={({ isActive }) => {
                return isActive
                  ? `px-2 py-3 text-white hover:text-white`
                  : "px-2 py-3 text-gray-400 hover:text-white transition-all";
              }}
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              to={`/explore`}
              className={({ isActive }) => {
                return isActive
                  ? `px-2 py-3 text-white hover:text-white`
                  : "px-2 py-3 text-gray-400 hover:text-white transition-all";
              }}
              caseSensitive
            >
              Explore
            </NavLink>
          )}
          {!isLoggedIn ? (
            <NavLink
              to={`/signin`}
              className={({ isActive }) => {
                return isActive
                  ? `px-2 py-3 text-white hover:text-white`
                  : "px-2 py-3 text-gray-400 hover:text-white transition-all";
              }}
            >
              Login
            </NavLink>
          ) : (
            <NavLink
              to={`/profiles/${auth.currentUser!.uid}/settings`}
              className={({ isActive }) => {
                return isActive
                  ? `px-2 py-3 text-white hover:text-white`
                  : "px-2 py-3 text-gray-400 hover:text-white transition-all";
              }}
            >
              Settings
            </NavLink>
          )}
          {!isLoggedIn && (
            <button
              className="rounded-md bg-[#5e167c] hover:bg-[#4e0f68] px-4 py-3 font-medium  transition-all"
              onClick={() => navigate("/signup")}
            >
              Start writing
            </button>
          )}
          {isLoggedIn && (
            <button
              className="font-medium text-gray-400 hover:text-white"
              onClick={() => {
                signOut(auth);
                navigate("/");
              }}
            >
              Logout{" "}
            </button>
          )}
          {isLoggedIn && (
            <Avatar className="ml-2" name={auth.currentUser!.displayName} />
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default NavBar;
