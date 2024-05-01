import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useNewsletter } from "hooks/useNewsletter";
import { notFound } from "next/navigation";

async function getData() {
  try {
    const { getAllNewsletters } = useNewsletter();
    const newsletters = await getAllNewsletters();

    return newsletters;
  } catch (error) {
    return [];
  }
}

export default async function Page() {
  const newsletters = await getData();

  return (
    <div className="m-14 mt-20 p-5">
      <h1 className=" text-2xl font-bold">Newsletters</h1>

      <div>
        {newsletters.length === 0 && (
          <p className="text-center mt-5">No newsletters found</p>
        )}
        {newsletters.map((newsletter) => (
          <div
            key={newsletter.id}
            className="flex justify-between items-center p-2 my-2 border-b border-gray-200"
          >
            <p className="font-semibold">{newsletter.name}</p>
            <div className="flex gap-2">
              <Link href={`/newsletter/${newsletter.id}/article`}>
                <Button size="sm">Browse Articles</Button>
              </Link>
              <Link href={`/newsletter/${newsletter.id}/subscribe`}>
                <Button size="sm" className=" bg-green-400 hover:bg-green-600">
                  Subscribe
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
