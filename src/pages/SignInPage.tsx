import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import splashImage2 from "../assets/splash2.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useToast } from "@chakra-ui/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Sign in with credentials entered by the user
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("User", user);
      // Extract user ID from the user object to use for routing
      const userID = user.user.uid;
      navigate(`/profiles/${userID}`);
    } catch (error: any) {
      // If login details are incorrect, display alert message.
      if (error.code === "auth/invalid-credential") {
        console.log(error.code);
        toast({
          title: "Invalid login credentials",
          description: "Please use a valid email address / password.",
          status: "error",
          isClosable: true,
          duration: 3000,
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
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 lg:px-8 bg-gradient-to-tr from-[#020831] to-[#2f0404] ">
      <img src={splashImage2} alt="Splash of color" width="200" />

      <div>
        <h2 className="text-center text-2xl font-bold mt-4">Welcome back!</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={signIn}>
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
                disabled={isLoading === true}
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
                type="password"
                value={password}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                disabled={isLoading === true}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full rounded-md border-0 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 px-4 py-2 bg-white text-black ${
                  isLoading ? "opacity-20 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>
          <div>
            <button
              disabled={isLoading}
              type="submit"
              className={`mt-8 flex w-full justify-center rounded-md bg-[#5e167c] hover:bg-[#4e0f68] px-3 font-semibold py-2 text-white transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Login
            </button>
            <button
              disabled={isLoading}
              className={`mt-6 flex w-full justify-center rounded-md border-2 border-teal-700 px-3 font-semibold py-2 text-white transition-all ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-teal-400"
              }`}
              onClick={() => navigate("/signup")}
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
