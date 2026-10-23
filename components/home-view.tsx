import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { HeroShader } from "@/components/hero-shader";
import { SiteHeader } from "@/components/site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Dictionary } from "@/lib/content";
import { EMAIL, LINKEDIN, localeHash, localeHome, MAILTO, type Locale } from "@/lib/site";

function RichText({ parts }: { parts: { text: string; strong?: boolean }[] }) {
  return (
    <>
      {parts.map((part, index) =>
        part.strong ? (
          <strong key={`${part.text}-${index}`} className="font-semibold text-foreground">
            {part.text}
          </strong>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </>
  );
}

function SectionIntro({
  kicker,
  title,
  count,
  id,
}: {
  kicker: string;
  title: string;
  count: string;
  id: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="meta-label">{kicker}</p>
        <h2 id={id} className="display-title mt-2 text-3xl md:text-5xl">
          {title}
        </h2>
      </div>
      <Badge variant="outline" className="mb-1">
        {count}
      </Badge>
    </div>
  );
}

export function HomeView({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const home = localeHome(locale);

  return (
    <div className="relative min-h-svh">
      <div className="page-wash pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {copy.skip}
      </a>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-3 py-3 md:gap-5 md:px-5 md:py-5">
        <SiteHeader locale={locale} copy={copy} />
        <main id="content" className="flex flex-col gap-4 md:gap-6">
          <section
            id="top"
            aria-labelledby="hero-title"
            className="relative isolate overflow-hidden rounded-[1.75rem] md:rounded-[2rem]"
          >
            <HeroShader />
            <div className="relative z-10 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
              <div className="flex min-h-[calc(100svh-6.75rem)] flex-col gap-6 px-5 py-7 md:px-10 md:py-12">
                <div className="flex items-center justify-between gap-4">
                  <p className="meta-label">{copy.hero.role}</p>
                  <div className="relative size-16 overflow-hidden rounded-full ring-1 ring-border lg:hidden">
                    <Image
                      src="/images/alisina.png"
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover object-[center_18%]"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-muted-foreground md:text-base">{copy.hero.hello}</p>
                  <h1
                    id="hero-title"
                    className="display-title mt-2 text-[clamp(3rem,8vw,6.4rem)]"
                  >
                    {copy.hero.nameLines[0]}
                    <br />
                    {copy.hero.nameLines[1]}
                  </h1>
                </div>

                <p className="max-w-xl text-[clamp(1.25rem,2.6vw,2rem)] leading-snug font-medium text-balance">
                  {copy.hero.before}
                  <span className="text-gradient">{copy.hero.highlight}</span>
                  {copy.hero.after}
                </p>

                <Card variant="glass" size="sm" className="max-w-xl">
                  <CardContent className="text-sm leading-relaxed text-pretty text-foreground/90 md:text-base">
                    <RichText parts={copy.hero.bio} />
                  </CardContent>
                </Card>

                <div className="flex flex-wrap items-center gap-2">
                  <Button nativeButton={false} size="lg" render={<a href={MAILTO} />}>
                    {copy.nav.email}
                  </Button>
                  <Button
                    nativeButton={false}
                    size="lg"
                    variant="glass"
                    render={
                      <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" />
                    }
                  >
                    {copy.nav.linkedin}
                    <ArrowUpRight data-icon="inline-end" className="rtl:-scale-x-100" />
                  </Button>
                </div>
                <a
                  href={MAILTO}
                  dir="ltr"
                  className="w-fit text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {EMAIL}
                </a>

                <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                  <p className="meta-label max-w-40">
                    <span className="display-title block text-2xl text-foreground normal-case tracking-normal">
                      {copy.hero.yearsValue}
                    </span>
                    {copy.hero.yearsLabel}
                  </p>
                  <Link
                    href={localeHash(locale, "experience")}
                    className="meta-label inline-flex items-center gap-2"
                  >
                    {copy.hero.next}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="relative hidden min-h-[32rem] lg:block">
                <Image
                  src="/images/alisina.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 36vw, 0px"
                  className="portrait-mask object-cover object-[center_18%]"
                />
                <div className="portrait-wash pointer-events-none absolute inset-0" aria-hidden="true" />
                <Card variant="glass" size="sm" className="absolute end-6 bottom-8 w-40">
                  <CardHeader>
                    <CardTitle className="display-title text-3xl">
                      {copy.hero.statValue}
                    </CardTitle>
                    <CardDescription>{copy.hero.statLabel}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          <section
            id="experience"
            aria-labelledby="experience-title"
            className="scroll-mt-28 flex flex-col gap-4 px-1"
          >
            <SectionIntro
              id="experience-title"
              kicker={copy.experience.kicker}
              title={copy.experience.title}
              count={copy.experience.count}
            />
            <ul className="flex flex-col gap-3">
              {copy.experience.roles.map((role) => (
                <li key={`${role.role}-${role.meta}`}>
                  <a
                    href={role.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <Card variant="glass" size="sm" className="lift">
                      <CardHeader className="flex flex-row items-center gap-3">
                        <Avatar className="size-12 rounded-2xl after:rounded-2xl">
                          <AvatarImage
                            src={role.logo}
                            alt=""
                            className="rounded-2xl bg-white object-contain p-1"
                          />
                          <AvatarFallback className="rounded-2xl">{role.mark}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <CardTitle className="text-base text-pretty">
                            {role.role}
                            <span className="font-normal text-muted-foreground">
                              {" "}
                              · {role.org}
                            </span>
                          </CardTitle>
                          <CardDescription className="mt-1">{role.meta}</CardDescription>
                        </div>
                        <ArrowUpRight
                          className="ms-auto size-4 shrink-0 text-muted-foreground rtl:-scale-x-100"
                          aria-hidden="true"
                        />
                      </CardHeader>
                    </Card>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="impact"
            aria-labelledby="impact-title"
            className="scroll-mt-28 flex flex-col gap-4 px-1"
          >
            <SectionIntro
              id="impact-title"
              kicker={copy.impact.kicker}
              title={copy.impact.title}
              count={copy.impact.count}
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {copy.impact.items.map((item) => (
                <li key={item.detail}>
                  <Card variant="glass" className="h-full">
                    <CardHeader>
                      <p className="meta-label">{item.mark}</p>
                      <CardTitle className="display-title text-4xl md:text-5xl">
                        {item.figure}
                      </CardTitle>
                      <CardDescription className="text-base text-foreground/90">
                        {item.caption}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {copy.impact.stats.map((stat) => (
                <li key={stat.label}>
                  <Card variant="glass" size="sm" className="h-full">
                    <CardHeader>
                      <CardTitle className="display-title text-3xl">{stat.value}</CardTitle>
                      <CardDescription>{stat.label}</CardDescription>
                    </CardHeader>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="projects"
            aria-labelledby="projects-title"
            className="scroll-mt-28 flex flex-col gap-4"
          >
            <div className="px-1">
              <SectionIntro
                id="projects-title"
                kicker={copy.projects.kicker}
                title={copy.projects.title}
                count={copy.projects.count}
              />
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
                <RichText parts={copy.projects.intro} />
              </p>
            </div>
            <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
              {copy.projects.items.map((item) => (
                <li
                  key={item.href}
                  className="w-[min(82vw,19.5rem)] shrink-0 snap-start lg:w-auto"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full rounded-xl focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <Card variant="glass" className="lift h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="secondary">{item.day}</Badge>
                          <ArrowUpRight
                            className="size-4 text-muted-foreground rtl:-scale-x-100"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="display-title pt-6 text-4xl">{item.preview}</p>
                        <CardTitle className="display-title text-2xl">{item.name}</CardTitle>
                        <CardDescription className="text-pretty">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </CardContent>
                    </Card>
                  </a>
                </li>
              ))}
            </ul>
            <p className="px-1 text-sm text-muted-foreground lg:hidden">{copy.projects.swipe}</p>
          </section>

          <section
            id="education"
            aria-labelledby="education-title"
            className="scroll-mt-28 flex flex-col gap-4 px-1"
          >
            <SectionIntro
              id="education-title"
              kicker={copy.education.kicker}
              title={copy.education.title}
              count={copy.education.count}
            />
            <ul className="grid gap-3 md:grid-cols-2">
              {copy.education.items.map((item) => (
                <li key={`${item.name}-${item.year}`}>
                  <Card variant="glass" size="sm" className="h-full">
                    <CardHeader className="flex flex-row items-start justify-between gap-3">
                      <div className="min-w-0">
                        <CardTitle className="text-pretty">{item.name}</CardTitle>
                        <CardDescription className="mt-1">{item.detail}</CardDescription>
                      </div>
                      <Badge variant="outline">{item.year}</Badge>
                    </CardHeader>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="contact"
            aria-labelledby="contact-title"
            className="scroll-mt-28 grid gap-4 px-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start"
          >
            <div className="flex flex-col gap-4">
              <p className="meta-label">{copy.contact.kicker}</p>
              <h2 id="contact-title" className="display-title text-4xl md:text-6xl">
                {copy.contact.line1}
                <br />
                {copy.contact.before}
                <span className="text-gradient">{copy.contact.highlight}</span>
              </h2>
              <p className="max-w-md text-pretty text-muted-foreground">{copy.contact.intro}</p>
              <div className="flex flex-wrap gap-2">
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
              <a
                href={MAILTO}
                dir="ltr"
                className="w-fit text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {EMAIL}
              </a>
            </div>
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">{copy.contact.formTitle}</CardTitle>
                <CardDescription>{copy.contact.formHint}</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm locale={locale} copy={copy.contact} />
              </CardContent>
            </Card>
          </section>
        </main>

        <footer className="px-1 pt-2 pb-6">
          <Separator className="mb-5" />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{copy.hero.name}</p>
              <p className="text-sm text-muted-foreground">
                {copy.footer.rights}
                {" · "}
                {copy.footer.role}
                {" · "}
                <a href={MAILTO} dir="ltr" className="underline-offset-4 hover:underline">
                  {EMAIL}
                </a>
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a href={MAILTO} className="text-muted-foreground hover:text-foreground">
                {copy.nav.email}
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                {copy.nav.linkedin}
              </a>
              <a href={home} className="text-muted-foreground hover:text-foreground">
                {copy.footer.backToTop}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
