import Image from "next/image";
import { Button } from "@/components/ui/button";
import Banner from "@assets/images/banner.svg";
import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <main className="h-screen w-screen grid grid-cols-2 content-center items-center justify-items-center">
      <div className="h-screen">
        <Image src={Banner} alt="Banner" className=" h-full" />
      </div>
      <div className="mx-5">
        <h1 className="text-4xl font-bold italic">
          Welcome to Our Newsletter!
        </h1>
        <p className="text-lg mt-4">
          Stay informed, inspired, and connected with the latest updates,
          stories, and insights delivered straight to your inbox.
        </p>
        <Link href="/newsletter">
          <Button className="mt-4">Browse Newsletters</Button>
        </Link>
      </div>
    </main>
  );
}
