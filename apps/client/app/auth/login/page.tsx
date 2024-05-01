"use client";
import { useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate email
      if (!email) {
        throw new Error("Please enter your email");
      }

      // Check if email is valid
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        throw new Error("Invalid email address");
      }

      // Check if password is valid
      if (!password) {
        throw new Error("Please enter your password");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      await login(email, password);
      toast.success("You have successfully logged in!");
      // Redirect to home page
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative h-screen">
      <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Log In</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="johndoe@gmail.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit" onClick={handleSubmit}>
              Log In
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-between items-center">
            {/* <Link href="/auth/forgot-password">
              <Button variant="link">Forgot password?</Button>
            </Link> */}

            <Link href="/auth/signup">
              <Button variant="link">Sign up</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
