import { Button } from "@/components/ui/button";
import Link from "next/link";

const newsletters = [
  {
    id: 1,
    name: "Newsletter 1",
  },
  {
    id: 2,
    name: "Newsletter 2",
  },
  {
    id: 3,
    name: "Newsletter 3",
  },
  {
    id: 4,
    name: "Newsletter 4",
  },
  {
    id: 5,
    name: "Newsletter 5",
  },
  {
    id: 6,
    name: "Newsletter 6",
  },
  {
    id: 7,
    name: "Newsletter 7",
  },
  {
    id: 8,
    name: "Newsletter 8",
  },
  {
    id: 9,
    name: "Newsletter 9",
  },
  {
    id: 10,
    name: "Newsletter 10",
  },
  {
    id: 11,
    name: "Newsletter 11",
  },
  {
    id: 12,
    name: "Newsletter 12",
  },
  {
    id: 13,
    name: "Newsletter 13",
  },
  {
    id: 14,
    name: "Newsletter 14",
  },
  {
    id: 15,
    name: "Newsletter 15",
  },
];

export default function Component() {
  return (
    <div className="m-14 mt-20 p-5">
      <h1 className=" text-2xl font-bold">Newsletters</h1>

      <div>
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
