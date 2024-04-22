import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Post from "./pages/Post";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import ExplorePage from "./pages/ExplorePage";
import SettingsPage from "./pages/SettingsPage";
import BloggerPostPage from "./pages/BloggerPostPage";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UnauthorizedErrorPage from "./pages/UnauthorizedErrorPage";

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
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profiles/:bloggerId/settings",
        element: (
          <ProtectedRoutes>
            <SettingsPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profiles/:bloggerId/posts/:postId",
        element: <Post />,
      },
      {
        path: "/profiles/:bloggerId/posts",
        element: <BloggerPostPage />,
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
  {
    path: "/unauthorized",
    element: <UnauthorizedErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider
    toastOptions={{ defaultOptions: { position: "bottom" } }}
    resetCSS={false}
    disableGlobalStyle={true}
  >
    <RouterProvider router={router} />
  </ChakraProvider>
);
