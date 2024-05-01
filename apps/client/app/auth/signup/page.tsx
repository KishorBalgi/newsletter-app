"use client";
import { useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/navigation";
import { useAuthContext } from "context/authContext";
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

export default function Component() {
  const router = useRouter();
  const { register } = useAuth();
  const authContext = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        throw new Error("Please enter your name");
      }
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

      const res = await register(name, email, password);
      toast.success("You have successfully signed up!");
      // Redirect to home page
      router.push("/");
      authContext.login(res.token);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative h-screen">
      <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Enter your name, email and password to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              Sign Up
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-between items-center">
            {/* <Link href="/auth/forgot-password">
              <Button variant="link">Forgot password?</Button>
            </Link> */}

            <Link href="/auth/login">
              <Button variant="link">Log in</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
