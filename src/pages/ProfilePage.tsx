import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({}); // need to define to get rid of error
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        console.log("User is signed in");
      } else {
        // console.log("No user is signed in");
      }
    });
  });

  return (
    <div className="p-14">
      <h2 className="mt-20">
        {isLoggedIn
          ? `Welcome back ${currentUser.email}.`
          : `No user logged in`}
      </h2>
      <button
        className="mt-10 border-2 rounded-md p-2"
        onClick={() => {
          setIsLoggedIn(false);
          setCurrentUser({});
          signOut(auth);
          navigate("/");
        }}
      >
        Logout
      </button>
      <button></button>
    </div>
  );
}
