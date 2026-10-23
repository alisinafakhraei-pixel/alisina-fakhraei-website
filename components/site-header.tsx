"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Dictionary } from "@/lib/content";
import { localeHash, localeHome, MAILTO, LINKEDIN, type Locale } from "@/lib/site";

const links = [
  ["experience", "experience"],
  ["impact", "impact"],
  ["projects", "projects"],
  ["education", "education"],
  ["contact", "contact"],
] as const;

export function SiteHeader({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Dictionary;
}) {
  const [open, setOpen] = useState(false);
  const home = localeHome(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-4 md:px-6">
        <Button
          nativeButton={false}
          variant="ghost"
          className="px-1"
          render={<Link href={home} />}
        >
          <span className="grid size-8 place-items-center rounded-md bg-black text-xs font-semibold text-white">
            AF
          </span>
          <span className="hidden text-sm font-medium sm:inline">
            {copy.hero.name}
          </span>
        </Button>

        <nav
          aria-label={copy.nav.menu}
          className="ms-4 hidden items-center gap-1 lg:flex"
        >
          {links.map(([id, key]) => (
            <Button
              key={id}
              nativeButton={false}
              variant="ghost"
              size="sm"
              render={<Link href={localeHash(locale, id)} />}
            >
              {copy.nav[key]}
            </Button>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <div className="flex items-center gap-3 text-sm">
            <Link
              href="/"
              hrefLang="en"
              lang="en"
              aria-current={locale === "en" ? "page" : undefined}
              className={
                locale === "en"
                  ? "border-b border-primary font-medium text-black"
                  : "text-black/55 hover:text-black"
              }
            >
              EN
            </Link>
            <Link
              href="/fa"
              hrefLang="fa"
              lang="fa"
              aria-current={locale === "fa" ? "page" : undefined}
              className={`font-vazir ${
                locale === "fa"
                  ? "border-b border-primary font-medium text-black"
                  : "text-black/55 hover:text-black"
              }`}
            >
              فا
            </Link>
          </div>

          <Button
            nativeButton={false}
            variant="default"
            size="sm"
            className="hidden lg:inline-flex"
            render={<a href={MAILTO} />}
          >
            {copy.nav.email}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="lg:hidden"
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={copy.nav.openMenu}
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent
              side={locale === "fa" ? "left" : "right"}
              className="w-[min(100%,22rem)] bg-white"
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-medium">
                  {copy.nav.menu}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  {copy.hero.name}
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label={copy.nav.menu}>
                <Link
                  href={home}
                  className="py-2 text-lg"
                  onClick={() => setOpen(false)}
                >
                  {copy.nav.home}
                </Link>
                {links.map(([id, key]) => (
                  <Link
                    key={id}
                    href={localeHash(locale, id)}
                    className="py-2 text-lg"
                    onClick={() => setOpen(false)}
                  >
                    {copy.nav[key]}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button nativeButton={false} size="lg" render={<a href={MAILTO} />}>
                  {copy.nav.email}
                </Button>
                <Button
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  render={
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" />
                  }
                >
                  {copy.nav.linkedin}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
