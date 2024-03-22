import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6  lg:px-8 bg-teal-800">
      <div>
        <h2 className="text-center text-2xl font-bold">
          Welcome Back!
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
              className="mt-8 flex w-full justify-center rounded-md bg-teal-600 px-3 font-semibold py-2 text-white hover:bg-teal-700 transition-all"
            >
              Sign in
            </button>
            <button
              className="mt-6 flex w-full justify-center rounded-md border-2 border-teal-700 px-3 font-semibold py-2 text-white hover:bg-gray-600 transition-all"
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
