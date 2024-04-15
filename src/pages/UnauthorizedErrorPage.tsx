import errorImage from "../assets/error.svg";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center p-8">
      <img src={errorImage} width="200" alt="Error page" />
      <h1 className="my-8 text-4xl text-center">
        You do not have permission to access this page.
      </h1>
      <button
        className="rounded-md bg-[#5e167c] hover:bg-[#4e0f68] px-12 py-3 font-medium transition-all"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
}
