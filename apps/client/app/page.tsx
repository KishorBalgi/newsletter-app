import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
// import { Button } from "@repo/ui/button";
import { Button } from "@/components/ui/button";

export default function Page(): JSX.Element {
  return (
    <main>
      <h1 className="text-xl font-bold">
        <Button>Click me</Button>
      </h1>
    </main>
  );
}
