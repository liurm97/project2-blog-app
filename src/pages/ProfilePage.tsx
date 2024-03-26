import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="p-14">
      <button
        className="mt-10 border-2 rounded-md p-2"
        onClick={() => {
          signOut(auth);
          navigate("/");
        }}
      >
        Logout
      </button>
      <button></button>
    </div>
  );
}
