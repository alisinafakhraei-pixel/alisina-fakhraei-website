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
    <header className="sticky top-3 z-40">
      <div className="glass-surface flex items-center gap-1 rounded-full py-1.5 ps-1.5 pe-1.5 lg:ps-3 lg:pe-2">
        <Button
          nativeButton={false}
          variant="ghost"
          className="rounded-full px-2"
          render={<Link href={home} />}
        >
          <span className="grid size-8 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">
            AF
          </span>
          <span className="hidden text-sm font-medium sm:inline">
            {copy.hero.name}
          </span>
        </Button>

        <nav
          aria-label={copy.nav.menu}
          className="ms-2 hidden items-center gap-0.5 lg:flex"
        >
          {links.map(([id, key]) => (
            <Button
              key={id}
              nativeButton={false}
              variant="ghost"
              size="sm"
              className="rounded-full"
              render={<Link href={localeHash(locale, id)} />}
            >
              {copy.nav[key]}
            </Button>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-1">
          <div className="flex items-center rounded-full bg-foreground/5 p-0.5">
            <Button
              nativeButton={false}
              size="sm"
              variant={locale === "en" ? "default" : "ghost"}
              className="rounded-full px-2.5"
              aria-current={locale === "en" ? "page" : undefined}
              render={<Link href="/" hrefLang="en" lang="en" />}
            >
              EN
            </Button>
            <Button
              nativeButton={false}
              size="sm"
              variant={locale === "fa" ? "default" : "ghost"}
              className="font-vazir rounded-full px-2.5"
              aria-current={locale === "fa" ? "page" : undefined}
              render={<Link href="/fa" hrefLang="fa" lang="fa" />}
            >
              فا
            </Button>
          </div>

          <Button
            nativeButton={false}
            variant="default"
            size="sm"
            className="hidden rounded-full lg:inline-flex"
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
                  size="icon-lg"
                  className="rounded-full"
                  aria-label={copy.nav.openMenu}
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent
              side={locale === "fa" ? "left" : "right"}
              className="glass-surface w-[min(100%,22rem)] border-border"
            >
              <SheetHeader>
                <SheetTitle className="display-title text-2xl">
                  {copy.nav.menu}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  {copy.hero.name}
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label={copy.nav.menu}>
                <Link
                  href={home}
                  className="display-title py-2 text-3xl"
                  onClick={() => setOpen(false)}
                >
                  {copy.nav.home}
                </Link>
                {links.map(([id, key]) => (
                  <Link
                    key={id}
                    href={localeHash(locale, id)}
                    className="display-title py-2 text-3xl"
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
