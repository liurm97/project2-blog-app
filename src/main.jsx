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
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
    <ChakraProvider
      toastOptions={{ defaultOptions: { position: "bottom" } }}
      resetCSS={false}
      disableGlobalStyle={true}
    >
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
