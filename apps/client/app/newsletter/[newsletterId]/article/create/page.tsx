"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useNewsletter } from "hooks/useNewsletter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { newsletterId } = useParams();
  const { createArticle } = useNewsletter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title) {
        throw new Error("Please enter the title of the article");
      }

      if (!content) {
        throw new Error("Please enter the content of the article");
      }

      const article = await createArticle(Number(newsletterId), title, content);
      toast.success("Article created successfully");
      router.push(`/newsletter/${newsletterId}/article/${article.id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="m-14 mt-20 p-5">
      <h1 className=" text-2xl font-bold">Create an Article</h1>

      <div className="my-5 flex flex-col gap-2">
        <div className="mb-3 flex flex-col gap-3">
          <Label className="mx-2">Title</Label>
          <Input
            placeholder="Enter the name of the article"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3 flex flex-col gap-3">
          <Label className="mx-2">Content</Label>
          <Textarea
            placeholder="Enter the content of the article"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <Button className="w-fit self-end" onClick={handleSubmit}>
          Create Article
        </Button>
      </div>
    </div>
  );
}
