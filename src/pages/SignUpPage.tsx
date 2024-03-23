import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import splashImage1 from "../assets/splash1.svg";


export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    // To connect to Firebase Auth
  };

  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 lg:px-8 bg-slate-800">
      <img src={splashImage1} alt="Splash of color" width="150" />
      <div>
        <h2 className="text-center text-2xl font-bold mt-4">
          Let's get you started!
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={handleSubmit} method="POST">
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@gmail.com"
                className="block w-full rounded-md border-0 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-4 py-2 bg-white text-black"
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
                pattern="[a-zA-Z0-9]{6,}"
                title="Enter a password with at least 6 characters"
                value={password}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-4 py-2 bg-white text-black"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="mt-8 flex w-full justify-center rounded-md bg-slate-600 px-3 font-semibold py-2 text-white hover:bg-slate-700 transition-all"
            >
              Create account
            </button>
            <button
              className="mt-6 flex w-full justify-center rounded-md border-2 border-slate-600 hover:border-slate-400 px-3 font-semibold py-2 text-white transition-all"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
