import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/content";

export default function NotFound() {
  const en = getDictionary("en");
  const fa = getDictionary("fa");

  return (
    <main className="min-h-svh bg-white text-black">
      <div className="h-[3px] bg-primary" />
      <div className="mx-auto grid min-h-[calc(100svh-3px)] max-w-[1440px] grid-cols-[3.15rem_minmax(0,1fr)] border-x border-black/15">
        <div className="border-e border-black/15 px-2 py-8">
          <p className="meta-label">404</p>
        </div>
        <div className="flex flex-col justify-center gap-5 px-5 py-16 sm:px-10">
          <h1 className="display-title text-4xl sm:text-6xl">{en.notFound.title}</h1>
          <p className="font-vazir text-2xl sm:text-3xl">{fa.notFound.title}</p>
          <p className="max-w-md text-black/60">{en.notFound.body}</p>
          <p className="font-vazir max-w-md text-black/60">{fa.notFound.body}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button nativeButton={false} className="rounded-none" render={<Link href="/" />}>
              {en.notFound.home}
            </Button>
            <Button
              nativeButton={false}
              variant="secondary"
              className="rounded-none font-vazir"
              render={<Link href="/fa" />}
            >
              {fa.notFound.home}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
