"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useNewsletter } from "hooks/useNewsletter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ProtectedRoute from "@/components/routes/protectedRoutes";

export default function Page() {
  const router = useRouter();
  const { createNewsletter } = useNewsletter();

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        throw new Error("Please enter the name of the newsletter");
      }

      const newsletter = await createNewsletter(name);
      toast.success("Newsletter created successfully");
      router.push(`/newsletter/${newsletter.id}/article/create`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <ProtectedRoute>
      <div className="m-14 mt-20 p-5">
        <h1 className=" text-2xl font-bold">Create a Newsletter</h1>

        <div className="my-5 flex flex-col">
          <div className="mb-3 flex flex-col gap-3">
            <Label className="mx-2">Name</Label>
            <Input
              placeholder="Enter the name of the newsletter"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button className="w-fit self-end" onClick={handleSubmit}>
            Create Newsletter
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
