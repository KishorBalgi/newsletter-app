import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useNewsletter } from "hooks/useNewsletter";
import { notFound } from "next/navigation";

async function getData({ params }) {
  try {
    const { getArticlesForNewsletter } = useNewsletter();
    const articles = await getArticlesForNewsletter(params.newsletterId);

    return articles;
  } catch (error) {
    if (error.message === "404-page-not-found") {
      return notFound();
    }
    return [];
  }
}

export default async function Component({
  params,
}: {
  params: { newsletterId: string };
}) {
  const articles = await getData({ params });

  return (
    <div className="m-14 mt-20 p-5">
      <h1 className=" text-2xl font-bold">Articles</h1>

      <div>
        {articles.length === 0 && (
          <p className="text-center mt-5">No articles found</p>
        )}
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
