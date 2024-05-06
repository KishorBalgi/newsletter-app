import { useNewsletter } from "hooks/useNewsletter";
import { notFound } from "next/navigation";

async function getData({ params }) {
  try {
    const { getArticleById } = useNewsletter();
    const article = await getArticleById(params.newsletterId, params.articleId);

    return article;
  } catch (error) {
    return notFound();
  }
}
export default async function Component({
  params,
}: {
  params: { newsletterId: string; articleId: string };
}) {
  const article = await getData({ params });

  return (
    <div className="m-14 mt-20 p-5">
      <h1 className=" text-3xl font-bold">{article.title}</h1>

      <div className="rounded-lg bg-gray-200 p-5 my-5">
        <p>{article.body}</p>
      </div>
    </div>
  );
}
