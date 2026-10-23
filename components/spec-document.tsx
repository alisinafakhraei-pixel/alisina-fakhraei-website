import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { SpecChrome } from "@/components/spec-chrome";
import type { Dictionary, Segment } from "@/lib/content";
import { localizeDigits } from "@/lib/digits";
import { EMAIL, LINKEDIN, MAILTO, type Locale } from "@/lib/site";

function Rich({ parts }: { parts: Segment[] }) {
  return parts.map((part, index) => {
    if (part.latin) {
      return (
        <bdi key={index} dir="ltr" className={part.strong ? "font-semibold" : undefined}>
          {part.text}
        </bdi>
      );
    }
    if (part.strong) {
      return (
        <strong key={index} className="font-semibold">
          {part.text}
        </strong>
      );
    }
    return <span key={index}>{part.text}</span>;
  });
}

function Frame({
  id,
  index,
  label,
  rail,
  tone,
  children,
}: {
  id: string;
  index: string;
  label: string;
  rail: string;
  tone: "black" | "white";
  children: React.ReactNode;
}) {
  const dark = tone === "black";
  return (
    <section
      id={id}
      data-spec-section
      tabIndex={-1}
      className={
        dark
          ? "scroll-mt-20 border-b border-white/15 bg-black text-white outline-none"
          : "scroll-mt-20 border-b border-black/15 bg-white text-black outline-none"
      }
    >
      <div
        className={`mx-auto grid max-w-[1440px] grid-cols-[3.15rem_minmax(0,1fr)] border-x md:grid-cols-[6.75rem_minmax(0,1fr)] lg:grid-cols-[7.5rem_minmax(0,1fr)_11.5rem] ${
          dark ? "border-white/15" : "border-black/15"
        }`}
      >
        <div className={`relative border-e px-2 py-8 md:px-4 md:py-16 ${dark ? "border-white/15" : "border-black/15"}`}>
          <div className="spec-index-mark absolute inset-y-0 start-0 w-[3px]" />
          <p className="spec-index meta-label sticky top-20">{index}</p>
          <p className="mt-3 hidden text-xs opacity-50 md:block">{label}</p>
        </div>
        <div className="min-w-0 px-4 py-10 sm:px-6 md:px-10 md:py-16 lg:px-14">{children}</div>
        <div className={`hidden border-s px-4 py-16 lg:block ${dark ? "border-white/15" : "border-black/15"}`}>
          <p className="meta-label sticky top-20 opacity-45">{rail}</p>
        </div>
      </div>
    </section>
  );
}

export function SpecDocument({ locale, copy }: { locale: Locale; copy: Dictionary }) {
  const section = (id: string) => copy.sections.find((item) => item.id === id)!;

  return (
    <>
      <SpecChrome locale={locale} copy={copy} />
      <main>
        <Frame {...section("cover")} tone="black">
          <p className="meta-label text-primary">{copy.cover.role}</p>
          <h1 className="display-title mt-4 text-[clamp(3.1rem,11vw,7.4rem)]">
            <span className="block">{copy.cover.nameLines[0]}</span>
            <span className="block">{copy.cover.nameLines[1]}</span>
          </h1>
          <p className="display-title mt-8 max-w-4xl text-[clamp(1.7rem,4.4vw,3.5rem)] text-balance">
            {copy.cover.before}
            <span className="text-primary">{copy.cover.highlight}</span>
            {copy.cover.after}
          </p>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">
            <Rich parts={copy.cover.bio} />
          </p>
          <dl className="mt-12 grid border-t border-white/15 sm:grid-cols-3">
            {copy.cover.facts.map((fact) => (
              <div
                key={fact.label}
                className="border-b border-white/15 py-4 sm:border-b-0 sm:border-e sm:px-5 sm:first:ps-0 sm:last:border-e-0"
              >
                <dt className="meta-label text-white/45">{fact.label}</dt>
                <dd className="mt-2 text-lg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Frame>

        <Frame {...section("changelog")} tone="white">
          <h2 className="display-title text-[clamp(2.4rem,6vw,4.6rem)]">{copy.changelog.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-black/65 md:text-lg">
            {copy.changelog.lede}
          </p>
          <div className="mt-10 border-t border-black/15">
            {copy.changelog.entries.map((entry) => (
              <article key={entry.id} className="grid gap-3 border-b border-black/15 py-7 md:grid-cols-[7.5rem_minmax(0,1fr)] md:gap-8">
                <div>
                  <p className="text-sm tabular-nums">{entry.id}</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-xs">
                    <span className={`size-1.5 ${entry.live ? "bg-primary" : "bg-black/25"}`} aria-hidden />
                    {entry.status}
                  </p>
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl">{entry.role}</h3>
                  <p className="mt-2 flex items-center gap-3">
                    <Image
                      src={entry.logo}
                      alt=""
                      width={28}
                      height={28}
                      className="size-7 object-contain"
                    />
                    <a
                      href={entry.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-primary"
                    >
                      {entry.org}
                    </a>
                  </p>
                  <p className="mt-2 text-sm text-black/55">{entry.meta}</p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed">{entry.note}</p>
                </div>
              </article>
            ))}
          </div>
        </Frame>

        <Frame {...section("metrics")} tone="black">
          <h2 className="display-title text-[clamp(2.4rem,6vw,4.6rem)]">{copy.metrics.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
            {copy.metrics.lede}
          </p>
          <div className="mt-10 border-t border-white/15">
            <div className="flex items-baseline justify-between gap-6 border-b border-white/15 py-3 text-xs text-white/55">
              <span>{copy.metrics.outcomeLabel}</span>
              <span>{copy.metrics.sourceLabel}</span>
            </div>
            {copy.metrics.outcomes.map((item) => (
              <div key={item.figure} className="border-b border-white/15 py-6">
                <p className="display-title text-[clamp(2.15rem,8vw,4.5rem)] leading-none whitespace-nowrap text-primary">
                  {item.figure}
                </p>
                <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <p className="text-lg">{item.caption}</p>
                  <p className="text-sm text-white/60">{item.source}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="meta-label mt-12 text-white/45">{copy.metrics.scaleLabel}</p>
          <div className="mt-4 grid grid-cols-2 gap-px bg-white/15 md:grid-cols-4">
            {copy.metrics.stats.map((stat) => (
              <div key={stat.label} className="bg-black px-3 py-4 sm:px-4">
                <p className="display-title text-3xl tabular-nums sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm leading-snug text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </Frame>

        <Frame {...section("builds")} tone="white">
          <h2 className="display-title text-[clamp(2.4rem,6vw,4.6rem)]">{copy.builds.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-black/65 md:text-lg">
            <Rich parts={copy.builds.intro} />
          </p>
          <div className="mt-10 border-t border-black/15">
            {copy.builds.items.map((item) => (
              <article
                key={item.name}
                className="grid gap-4 border-b border-black/15 py-7 lg:grid-cols-[7.5rem_minmax(0,1fr)_11rem] lg:gap-8"
              >
                <p className="meta-label text-black/45">{item.day}</p>
                <div className="min-w-0">
                  <h3 className="display-title text-4xl">
                    <bdi dir="ltr">{item.name}</bdi>
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed md:text-base">{item.description}</p>
                  <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-black/50">
                    {item.tags.map((tag) => (
                      <bdi key={tag} dir="ltr">
                        {tag}
                      </bdi>
                    ))}
                  </p>
                </div>
                <div className="flex items-end justify-between gap-4 lg:flex-col lg:items-stretch">
                  <div>
                    <p className="meta-label text-black/40">{copy.builds.specimen}</p>
                    <p className="mt-2 text-sm">
                      <bdi dir={/[A-Za-z$]/.test(item.preview) ? "ltr" : undefined}>{item.preview}</bdi>
                    </p>
                  </div>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center justify-center border border-black px-4 text-sm hover:bg-black hover:text-white"
                  >
                    {copy.builds.open}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Frame>

        <Frame {...section("appendix")} tone="black">
          <h2 className="display-title text-[clamp(2.4rem,6vw,4.6rem)]">{copy.appendix.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
            {copy.appendix.lede}
          </p>
          <ol className="mt-10 border-t border-white/15">
            {copy.appendix.items.map((item, index) => (
              <li
                key={item.name}
                className="grid grid-cols-1 gap-1 border-b border-white/15 py-5 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
              >
                <span className="text-xs text-primary tabular-nums">
                  {localizeDigits(String(index + 1).padStart(2, "0"), locale)}
                </span>
                <span className="min-w-0">
                  <span className="block text-lg">{item.name}</span>
                  <span className="mt-1 block text-sm text-white/55">{item.detail}</span>
                </span>
                <span className="text-sm text-white/70 sm:text-end">{item.year}</span>
              </li>
            ))}
          </ol>
        </Frame>

        <Frame {...section("contact")} tone="white">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] lg:gap-16">
            <div>
              <h2 className="display-title text-[clamp(2.5rem,6vw,4.8rem)]">{copy.contact.title}</h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-black/65 md:text-lg">
                {copy.contact.lede}
              </p>
              <p className="mt-8 text-sm text-black/50">{copy.contact.direct}</p>
              <a
                href={MAILTO}
                dir="ltr"
                className="mt-2 inline-block max-w-full break-all text-lg underline decoration-primary decoration-2 underline-offset-4"
              >
                {EMAIL}
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block text-sm underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-primary"
              >
                {copy.links.linkedin}
              </a>
            </div>
            <ContactForm locale={locale} copy={copy.contact} />
          </div>
        </Frame>
      </main>
      <footer className="bg-black text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-x border-white/15 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm">
            {copy.footer.rights}
            <span className="px-2 text-white/35">·</span>
            {copy.footer.role}
          </p>
          <a href="#cover" className="text-sm text-white/70 underline decoration-primary decoration-2 underline-offset-4">
            {copy.footer.top}
          </a>
        </div>
      </footer>
    </>
  );
}
