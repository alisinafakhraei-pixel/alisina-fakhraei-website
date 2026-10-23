import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-lg flex-col justify-center gap-4 px-6">
      <h1 className="display-title text-4xl">Page not found</h1>
      <p className="text-muted-foreground">صفحه پیدا نشد</p>
      <div className="flex gap-2">
        <Button nativeButton={false} render={<Link href="/" />}>
          Home
        </Button>
        <Button nativeButton={false} variant="outline" render={<Link href="/fa" />}>
          فارسی
        </Button>
      </div>
    </main>
  );
}
