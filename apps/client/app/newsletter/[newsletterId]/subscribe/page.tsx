"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useNewsletter } from "hooks/useNewsletter";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [email, setEmail] = useState("");
  const { newsletterId } = useParams();

  const { subscribeToNewsletter } = useNewsletter();

  const handleSubscribe = async () => {
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

      await subscribeToNewsletter(Number(newsletterId), email);
      toast.success("You have successfully subscribed to the newsletter");
      setEmail("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="relative h-screen">
      <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Subscribe to the newsletter
          </CardTitle>
          <CardDescription>
            Enter your email to subscribe to the newsletter
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
            <Button className="w-full" type="submit" onClick={handleSubscribe}>
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
