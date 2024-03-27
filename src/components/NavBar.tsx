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
      <nav className="py-6 px-14 flex justify-between items-center fixed w-full backdrop-blur-sm z-1">
        <p>Logo</p>
        <div className="flex items-center">
          <NavLink
            to={`/explore`}
            className={({ isActive }) => {
              return isActive
                ? `mr-12 px-2 py-3 text-white hover:text-white`
                : "mr-12 px-2 py-3 text-gray-400 hover:text-white transition-all";
            }}
            caseSensitive
          >
            Explore
          </NavLink>
          {!isLoggedIn && (
            <NavLink
              to={`/signin`}
              className={({ isActive }) => {
                return isActive
                  ? `mr-12 px-2 py-3 text-white hover:text-white`
                  : "mr-12 px-2 py-3 text-gray-400 hover:text-white transition-all";
              }}
            >
              Login
            </NavLink>
          )}
          {!isLoggedIn && (
            <button
              className="rounded-md bg-[#5e167c] px-6 py-3 font-medium hover:bg-[#4e0f68] transition-all"
              onClick={() => navigate("/signup")}
            >
              Start writing
            </button>
          )}
          {isLoggedIn && (
            <button
              className="mr-12 font-medium"
              onClick={() => {
                signOut(auth);
                navigate("/");
              }}
            >
              Logout{" "}
            </button>
          )}
          {isLoggedIn && <Avatar name={auth.currentUser.displayName} />}
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default NavBar;
