"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useNewsletter } from "hooks/useNewsletter";
import { useAuthContext } from "contexts/authContext";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";

export default function Page() {
  const { user } = useAuthContext();
  const { getAllNewsletters } = useNewsletter();
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchData = async () => {
    setloading(true);
    const newsletters = await getAllNewsletters();
    setNewsletters(newsletters);
    setloading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-14 mt-20 p-5">
      <div className="flex justify-between p-2 my-2">
        <h1 className=" text-2xl font-bold">Newsletters</h1>
        {user && (
          <Button className="w-fit">
            <Link href="/newsletter/create">Create Newsletter</Link>
          </Button>
        )}
      </div>

      <div>
        {loading && (
          <div className="flex justify-center items-center h-24">
            <LoadingSpinner />
          </div>
        )}
        {!loading && newsletters.length === 0 && (
          <p className="text-center mt-5">No newsletters found</p>
        )}
        {!loading &&
          newsletters.map((newsletter) => (
            <div
              key={newsletter.id}
              className="flex justify-between items-center p-2 my-2 border-b border-gray-200"
            >
              <p className="font-semibold">{newsletter.name}</p>
              <div className="flex gap-2">
                {user && user.id === newsletter.authorId && (
                  <Link href={`/newsletter/${newsletter.id}/article/create`}>
                    <Button size="sm" className=" bg-black hover:bg-slate-600">
                      Create Article
                    </Button>
                  </Link>
                )}
                <Link href={`/newsletter/${newsletter.id}/article`}>
                  <Button size="sm">Browse Articles</Button>
                </Link>
                <Link href={`/newsletter/${newsletter.id}/subscribe`}>
                  <Button
                    size="sm"
                    className=" bg-green-400 hover:bg-green-600"
                  >
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
