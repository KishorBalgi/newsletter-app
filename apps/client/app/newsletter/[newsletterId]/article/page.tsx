import { Button } from "@/components/ui/button";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "Article 1",
    body: "Article 1 body",
  },
  {
    id: 2,
    title: "Article 2",
    body: "Article 2 body",
  },
  {
    id: 3,
    title: "Article 3",
    body: "Article 3 body",
  },
  {
    id: 4,
    title: "Article 4",
    body: "Article 4 body",
  },
  {
    id: 5,
    title: "Article 5",
    body: "Article 5 body",
  },
  {
    id: 6,
    title: "Article 6",
    body: "Article 6 body",
  },
  {
    id: 7,
    title: "Article 7",
    body: "Article 7 body",
  },
  {
    id: 8,
    title: "Article 8",
    body: "Article 8 body",
  },
  {
    id: 9,
    title: "Article 9",
    body: "Article 9 body",
  },
  {
    id: 10,
    title: "Article 10",
    body: "Article 10 body",
  },
  {
    id: 11,
    title: "Article 11",
    body: "Article 11 body",
  },
  {
    id: 12,
    title: "Article 12",
    body: "Article 12 body",
  },
  {
    id: 13,
    title: "Article 13",
    body: "Article 13 body",
  },
  {
    id: 14,
    title: "Article 14",
    body: "Article 14 body",
  },
];

export default function Component({
  params,
}: {
  params: { newsletterId: string };
}) {
  return (
    <div className="m-14 mt-20 p-5">
      <h1 className=" text-2xl font-bold">Articles</h1>

      <div>
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex justify-between items-center p-2 my-2 border-b border-gray-200"
          >
            <p>{article.title}</p>
            <div className="flex gap-2">
              <Link
                href={`/newsletter/${params.newsletterId}/article/${article.id}`}
              >
                <Button size="sm" className=" bg-green-400 hover:bg-green-600">
                  Read
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
