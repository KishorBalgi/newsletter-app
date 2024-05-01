import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
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
            <Link href="/auth/login">
              <Button size="sm" variant="outline">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
