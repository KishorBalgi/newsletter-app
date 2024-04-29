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
  return (
    <div className="relative h-screen">
      <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Forgot Passoword</CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <Button className="w-full" type="submit">
              Reset Password
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-between items-center">
            <Link href="/auth/login">
              <Button variant="link">Log in</Button>
            </Link>

            <Link href="/auth/signup">
              <Button variant="link">Sign up</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
