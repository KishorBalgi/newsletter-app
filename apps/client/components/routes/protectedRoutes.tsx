"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "context/authContext";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { user, isValidating } = useAuthContext();

  useEffect(() => {
    console.log(isValidating, user);
    if (!isValidating && !user) {
      router.push("/auth/login");
    }
  }, [isValidating, user]);

  return !isValidating && user ? children : null;
}
