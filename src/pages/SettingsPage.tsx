import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const saveName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
      navigate(`/profiles/${auth.currentUser.uid}/dashboard`);
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        status: "error",
        isClosable: true,
        duration: 3000,
        variant: "solid",
      });
    }
    setFirstName("");
    setLastName("");
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 lg:px-8">
      <div>
        <h2 className="text-center text-2xl font-bold mt-4">
          Tell us your name
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={saveName}>
          <div>
            <label htmlFor="firstName" className="block font-medium">
              First name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                required
                disabled={isLoading === true}
                onChange={(e) => setFirstName(e.target.value)}
                className={`block w-full rounded-md border-0 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 px-4 py-2 bg-white text-black ${
                  isLoading ? "opacity-20 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="lastName" className="block font-medium">
                Last name
              </label>
            </div>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                required
                disabled={isLoading === true}
                onChange={(e) => setLastName(e.target.value)}
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
              className={`mt-12 flex w-full justify-center rounded-md bg-[#5e167c] hover:bg-[#4e0f68] px-3 font-semibold py-2 text-white transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
