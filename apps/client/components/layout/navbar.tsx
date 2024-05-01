"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";
import { useAuth } from "hooks/useAuth";
import { useAuthContext } from "context/authContext";

export default function Navbar() {
  const { user, isValidating, logout: logoutUser } = useAuthContext();
  const { logout } = useAuth();

  const handelLogout = async () => {
    try {
      await logout();
      logoutUser();
      toast.success("You have successfully logged out!");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" href="/">
            <h1 className="text-lg font-bold italic">Newsletter</h1>
          </Link>
          <nav className="hidden md:flex gap-12">
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="/newsletter"
            >
              Newsletters
            </Link>
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              href="/about"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {isValidating ? (
              <LoadingSpinner />
            ) : (
              <>
                {user ? (
                  <Button size="sm" onClick={handelLogout}>
                    Log out
                  </Button>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button size="sm" variant="outline">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button size="sm">Sign up</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
