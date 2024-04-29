import { Button } from "@/components/ui/button";
import Link from "next/link";

const article = {
  id: 1,
  title: "Article 1",
  body: "Article 1 body",
};

export default function Component({
  params,
}: {
  params: { newsletterId: string };
}) {
  return (
    <div className="m-14 mt-20 p-5">
      <h1 className=" text-2xl font-bold">{article.title}</h1>

      <div>
        <p>{article.body}</p>
      </div>
    </div>
  );
}
