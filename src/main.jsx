import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Post from "./pages/Post";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import ExplorePage from "./pages/ExplorePage";
import NavBar from "./components/NavBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/profiles/:bloggerName",
        element: <ProfilePage />,
      },
      {
        path: "/profiles/:bloggerName/posts/:postTitle",
        element: <Post />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
