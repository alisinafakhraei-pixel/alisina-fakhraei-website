import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
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
import type { Dictionary } from "@/lib/content";
import { EMAIL, LINKEDIN, localeHash, localeHome, MAILTO, type Locale } from "@/lib/site";

function RichText({ parts }: { parts: { text: string; strong?: boolean }[] }) {
  return (
    <>
      {parts.map((part, index) =>
        part.strong ? (
          <strong key={`${part.text}-${index}`} className="font-semibold">
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
  tone = "light",
}: {
  kicker: string;
  title: string;
  count: string;
  id: string;
  tone?: "light" | "dark";
}) {
  const quiet = tone === "dark" ? "text-white/55" : "text-black/55";
  const heading = tone === "dark" ? "text-white" : "text-black";

  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p className={`meta-label ${quiet}`}>{kicker}</p>
        <h2 id={id} className={`display-title mt-3 text-3xl md:text-5xl ${heading}`}>
          {title}
        </h2>
      </div>
      <p className={`mb-1 text-sm font-medium tracking-wide text-primary`}>{count}</p>
    </div>
  );
}

function Band({
  id,
  tone,
  labelledBy,
  children,
  className = "",
}: {
  id?: string;
  tone: "light" | "dark";
  labelledBy?: string;
  children: ReactNode;
  className?: string;
}) {
  const surface = tone === "dark" ? "bg-black text-white" : "bg-white text-black";

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-20 ${surface} ${className}`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16 md:px-6 md:py-24">
        {children}
      </div>
    </section>
  );
}

export function HomeView({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const home = localeHome(locale);
  const heroStats = [
    { value: copy.hero.statValue, label: copy.hero.statLabel },
    { value: copy.hero.yearsValue, label: copy.hero.yearsLabel },
    { value: copy.hero.since, label: copy.hero.sinceLabel },
  ];

  return (
    <div className="bg-white text-black">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {copy.skip}
      </a>
      <SiteHeader locale={locale} copy={copy} />
      <main id="content">
        <Band id="top" tone="dark" labelledBy="hero-title">
          <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)] lg:gap-16">
            <div className="flex flex-col gap-8">
              <p className="meta-label text-white/55">{copy.hero.role}</p>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-white/70 md:text-base">{copy.hero.hello}</p>
                <h1
                  id="hero-title"
                  className="display-title text-[clamp(3rem,7vw,5.5rem)] text-white"
                >
                  {copy.hero.nameLines[0]}
                  <br />
                  {copy.hero.nameLines[1]}
                </h1>
              </div>
              <p className="max-w-xl text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug font-medium text-balance text-white">
                {copy.hero.before}
                <span className="text-primary">{copy.hero.highlight}</span>
                {copy.hero.after}
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-pretty text-white/75 md:text-base">
                <RichText parts={copy.hero.bio} />
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button nativeButton={false} size="lg" render={<a href={MAILTO} />}>
                  {copy.nav.email}
                </Button>
                <Button
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-transparent text-white hover:border-white hover:bg-white hover:text-black"
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
                className="w-fit text-sm text-white/70 underline decoration-primary underline-offset-4 hover:text-white"
              >
                {EMAIL}
              </a>
              <Link
                href={localeHash(locale, "experience")}
                className="inline-flex w-fit items-center gap-2 text-sm text-white/70 transition-colors duration-150 hover:text-white"
              >
                {copy.hero.next}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
            <dl className="flex flex-col gap-6 border-t border-white/15 pt-8 lg:border-s lg:border-t-0 lg:pt-0 lg:ps-12">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="display-title text-3xl text-primary">{stat.value}</dt>
                  <dd className="mt-2 max-w-48 text-sm text-white/60">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Band>

        <Band id="experience" tone="light" labelledBy="experience-title">
          <SectionIntro
            id="experience-title"
            kicker={copy.experience.kicker}
            title={copy.experience.title}
            count={copy.experience.count}
          />
          <ul className="border-t border-black/10">
            {copy.experience.roles.map((role) => (
              <li key={`${role.role}-${role.meta}`}>
                <a
                  href={role.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border-b border-black/10 py-5 transition-colors duration-150 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Avatar className="size-11 rounded-md border border-black/10 bg-white after:rounded-md">
                    <AvatarImage
                      src={role.logo}
                      alt=""
                      className="rounded-md bg-white object-contain p-1"
                    />
                    <AvatarFallback className="rounded-md">{role.mark}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-base text-pretty">
                      {role.role}
                      <span className="text-black/55"> · {role.org}</span>
                    </p>
                    <p className="mt-1 text-sm text-black/55">{role.meta}</p>
                  </div>
                  <ArrowUpRight
                    className="ms-auto size-4 shrink-0 text-black/40 transition-colors duration-150 group-hover:text-primary rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Band>

        <Band id="impact" tone="dark" labelledBy="impact-title">
          <SectionIntro
            id="impact-title"
            kicker={copy.impact.kicker}
            title={copy.impact.title}
            count={copy.impact.count}
            tone="dark"
          />
          <ul className="grid gap-px bg-white/15 sm:grid-cols-2">
            {copy.impact.items.map((item) => (
              <li key={item.detail} className="flex flex-col gap-3 bg-black p-6 md:p-8">
                <p className="meta-label text-white/50">{item.mark}</p>
                <p className="display-title text-4xl text-primary md:text-5xl">{item.figure}</p>
                <p className="text-base text-white">{item.caption}</p>
                <p className="text-sm text-white/60">{item.detail}</p>
              </li>
            ))}
          </ul>
          <ul className="grid grid-cols-2 gap-px bg-white/15 lg:grid-cols-4">
            {copy.impact.stats.map((stat) => (
              <li key={stat.label} className="bg-black px-5 py-6">
                <p className="display-title text-3xl text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-white/60">{stat.label}</p>
              </li>
            ))}
          </ul>
        </Band>

        <Band id="projects" tone="light" labelledBy="projects-title">
          <div>
            <SectionIntro
              id="projects-title"
              kicker={copy.projects.kicker}
              title={copy.projects.title}
              count={copy.projects.count}
            />
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-pretty text-black/60 md:text-base">
              <RichText parts={copy.projects.intro} />
            </p>
          </div>
          <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {copy.projects.items.map((item) => (
              <li key={item.href} className="w-[min(82vw,20rem)] shrink-0 snap-start lg:w-auto">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-4 rounded-lg border border-black/10 p-5 transition-colors duration-150 hover:border-black focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-primary">{item.day}</p>
                    <ArrowUpRight
                      className="size-4 text-black/40 transition-colors duration-150 group-hover:text-primary rtl:-scale-x-100"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="display-title pt-6 text-4xl">{item.preview}</p>
                  <div className="mt-auto flex flex-col gap-2">
                    <p className="display-title text-2xl">{item.name}</p>
                    <p className="text-sm text-pretty text-black/60">{item.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="h-6 rounded-md border-black/15 bg-white px-2 text-black"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <p className="text-sm text-black/55 lg:hidden">{copy.projects.swipe}</p>
        </Band>

        <Band id="education" tone="light" labelledBy="education-title" className="border-t border-black/10">
          <SectionIntro
            id="education-title"
            kicker={copy.education.kicker}
            title={copy.education.title}
            count={copy.education.count}
          />
          <ul className="grid border-t border-black/10 md:grid-cols-2">
            {copy.education.items.map((item) => (
              <li
                key={`${item.name}-${item.year}`}
                className="flex items-start justify-between gap-4 border-b border-black/10 py-5 md:pe-8 md:odd:border-e md:odd:pe-8 md:even:ps-8"
              >
                <div className="min-w-0">
                  <p className="text-pretty">{item.name}</p>
                  <p className="mt-1 text-sm text-black/55">{item.detail}</p>
                </div>
                <p className="shrink-0 text-sm font-medium text-primary">{item.year}</p>
              </li>
            ))}
          </ul>
        </Band>

        <Band id="contact" tone="dark" labelledBy="contact-title">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="flex flex-col gap-6">
              <p className="meta-label text-white/55">{copy.contact.kicker}</p>
              <h2 id="contact-title" className="display-title text-4xl text-white md:text-6xl">
                {copy.contact.line1}
                <br />
                {copy.contact.before}
                <span className="text-primary">{copy.contact.highlight}</span>
              </h2>
              <p className="max-w-md text-pretty text-white/70">{copy.contact.intro}</p>
              <div className="flex flex-wrap gap-3">
                <Button nativeButton={false} size="lg" render={<a href={MAILTO} />}>
                  {copy.nav.email}
                </Button>
                <Button
                  nativeButton={false}
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-transparent text-white hover:border-white hover:bg-white hover:text-black"
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
                className="w-fit text-sm text-white/70 underline decoration-primary underline-offset-4 hover:text-white"
              >
                {EMAIL}
              </a>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{copy.contact.formTitle}</CardTitle>
                <CardDescription>{copy.contact.formHint}</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm locale={locale} copy={copy.contact} />
              </CardContent>
            </Card>
          </div>
        </Band>
      </main>

      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <div>
            <p className="font-medium">{copy.hero.name}</p>
            <p className="text-sm text-black/60">
              {copy.footer.rights}
              {" · "}
              {copy.footer.role}
              {" · "}
              <a href={MAILTO} dir="ltr" className="underline decoration-primary underline-offset-4">
                {EMAIL}
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href={MAILTO} className="text-black/60 underline-offset-4 hover:text-black hover:underline">
              {copy.nav.email}
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 underline-offset-4 hover:text-black hover:underline"
            >
              {copy.nav.linkedin}
            </a>
            <a href={home} className="text-black/60 underline-offset-4 hover:text-black hover:underline">
              {copy.footer.backToTop}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
