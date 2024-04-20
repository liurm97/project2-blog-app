import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { bloggerId } = useParams();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // If user is not logged in, redirect to sign in page.
      // If user is logged in, grant access if correct user ID matches the blogger ID in the route.
      if (user?.uid === undefined) {
        navigate("/signin", { replace: true });
      } else if (user?.uid === bloggerId) {
        return;
      } else if (user?.uid !== bloggerId) {
        navigate("/unauthorized", { replace: true });
      }
    });
  }, []);

  return children;
}
