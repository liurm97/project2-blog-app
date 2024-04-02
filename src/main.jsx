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
import SettingsPage from "./pages/SettingsPage";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ProtectedRoutes from "./components/ProtectedRoutes";

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
        path: "/profiles/:bloggerId/dashboard",
        element: (
          <ProtectedRoutes role="reader">
            <ProfilePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profiles/:bloggerId/settings",
        element: (
          <ProtectedRoutes role="reader">
            <SettingsPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profiles/:bloggerId/posts/:postTitle",
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
