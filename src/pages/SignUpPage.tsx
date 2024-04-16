import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import splashImage1 from "../assets/splash1.svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";

// // Add a new document in collection "cities"
// await setDoc(doc(db, "cities", "LA"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });
export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Create a new user with the credentials entered by the user
      const user = await createUserWithEmailAndPassword(auth, email, password);
      // Extract user ID from the user object to use for routing and claims
      const userID = user.user.uid;
      // Upon successful sign up, create record in the `users` collection
      await setDoc(doc(firestore, "users", userID), {
        bloggerName: "placeholder",
      });
      console.log("User", user);
      navigate(`/profiles/${userID}/settings`);
    } catch (error: any) {
      // If existing account exists, display alert message. Otherwise, display generic error message
      if (error.code === "auth/email-already-in-use") {
        console.log(error.code);
        toast({
          title: "Account already exists",
          description: "Please use another email address",
          status: "error",
          duration: 3000,
          isClosable: true,
          variant: "solid",
        });
      } else {
        console.log(error.code);
        toast({
          title: "An error occurred",
          description: "Please try again later.",
          status: "error",
          isClosable: true,
          duration: 3000,
          variant: "solid",
        });
      }
    }
    setEmail("");
    setPassword("");
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 lg:px-8 bg-gradient-to-r from-[#2e103a] to-[#190322]">
      <img src={splashImage1} alt="Splash of color" width="150" />
      <div>
        <h2 className="text-center text-2xl font-bold mt-4">
          Let's get you started!
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={signUp} method="POST">
          <div>
            <label htmlFor="email" className="block font-medium">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                autoComplete="email"
                required
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@gmail.com"
                className={`block w-full rounded-md border-0 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 px-4 py-2 bg-white text-black ${
                  isLoading ? "opacity-20 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block font-medium">
                Password
              </label>

              {/* Forgot password */}
              {/*
              <div className="text-sm">
                <a href="#" className="font-semibold text-gray-300">
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                role="password"
                type="password"
                pattern="[a-zA-Z0-9]{6,}"
                title="Enter a password with at least 6 characters"
                value={password}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full rounded-md border-0 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 px-4 py-2 bg-white text-black ${
                  isLoading ? "opacity-20 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-8 flex w-full justify-center rounded-md bg-[#5e167c] hover:bg-[#4e0f68] px-3 font-semibold py-2 text-white  transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Create account
            </button>
            <button
              className={`mt-6 flex w-full justify-center rounded-md border-2 border-slate-600 px-3 font-semibold py-2 text-white transition-all ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-slate-400"
              }`}
              onClick={() => navigate("/signin")}
              disabled={isLoading}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
