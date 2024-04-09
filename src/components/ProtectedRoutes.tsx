import { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// PropsWithChildren is a utility type that adds a children prop to any other type. The line below defines a new type ProtectedRoutesProps that is equivalent to PropsWithChildren with an additional role prop. This means ProtectedRoutesProps is an object type that has a children prop and a role prop
type ProtectedRoutesProps = PropsWithChildren<{
  role: string;
}>;

// Role prop is to simulate Firebase Auth claims, to replace with actual Firebase Auth claims

export default function ProtectedRoutes({
  children,
  role,
}: ProtectedRoutesProps) {
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "writer") {
      setLoading(false);
    } else if (role === "reader") {
      navigate("/signin", { replace: true });
    }
  }, [role]);

  if (isLoading) return null;

  return children;
}
