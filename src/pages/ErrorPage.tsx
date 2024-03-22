import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import errorImage from "../assets/error.svg";
import Spinner from "../components/Spinner";

export default function ErrorPage() {
  // const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center p-8">
      <img src={errorImage} width="200" alt="Error page" />
      <h1 className="mt-8 text-4xl text-center">
        Oops we can't find what you're looking for
      </h1>
      <p className="mt-8 mb-12 text-xl text-gray-500">
        Redirecting you to the homepage...
      </p>
      <Spinner />
    </div>
  );
}
