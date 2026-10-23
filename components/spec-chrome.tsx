"use client";

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import { PointerField } from "@/components/pointer-field";
import type { Dictionary } from "@/lib/content";
import { localizeDigits } from "@/lib/digits";
import { LINKEDIN, localeHome, MAILTO, type Locale } from "@/lib/site";

type IndexItem = {
  key: string;
  index: string;
  label: string;
  kind: "section" | "mail" | "external" | "route";
  href?: string;
  id?: string;
};

export function SpecChrome({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Dictionary;
}) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [time, setTime] = useState("—");
  const mac = useSyncExternalStore(
    () => () => {},
    () => /Mac|iPhone|iPad/.test(navigator.userAgent),
    () => true,
  );
  const modKey = mac ? "⌘" : "Ctrl";
  const [activeId, setActiveId] = useState(copy.sections[0]?.id ?? "cover");
  const otherLocale: Locale = locale === "en" ? "fa" : "en";

  const items = useMemo<IndexItem[]>(() => {
    const sections: IndexItem[] = copy.sections.map((section) => ({
      key: section.id,
      index: section.index,
      label: section.label,
      kind: "section",
      id: section.id,
    }));
    return [
      ...sections,
      {
        key: "email",
        index: "—",
        label: copy.links.email,
        kind: "mail",
        href: MAILTO,
      },
      {
        key: "linkedin",
        index: "—",
        label: copy.links.linkedin,
        kind: "external",
        href: LINKEDIN,
      },
      {
        key: "language",
        index: "—",
        label: copy.chrome.language,
        kind: "route",
        href: localeHome(otherLocale),
      },
    ];
  }, [copy, otherLocale]);

  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return items;
    return items.filter((item) =>
      `${item.index} ${item.label}`.toLocaleLowerCase().includes(needle),
    );
  }, [items, query]);

  const active = copy.sections.find((section) => section.id === activeId) ?? copy.sections[0];
  const selected = Math.min(cursor, Math.max(visible.length - 1, 0));

  useEffect(() => {
    const tick = () => {
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Tehran",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }).format(new Date());
      setTime(localizeDigits(formatted, locale));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [locale]);

  useEffect(() => {
    let frame = 0;
    const mark = () => {
      frame = 0;
      const nodes = [...document.querySelectorAll<HTMLElement>("[data-spec-section]")];
      if (!nodes.length) return;
      const line = 96;
      let current = nodes[0];
      for (const node of nodes) {
        if (node.getBoundingClientRect().top - line <= 0) current = node;
      }
      setActiveId(current.id);
      for (const node of nodes) node.toggleAttribute("data-active", node === current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(mark);
    };
    mark();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setQuery("");
      setCursor(0);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-${selected}`)?.scrollIntoView({ block: "nearest" });
  }, [open, selected, listId, query]);

  function choose(item: IndexItem) {
    setOpen(false);
    if (item.kind === "section" && item.id) {
      const id = item.id;
      window.requestAnimationFrame(() => {
        const node = document.getElementById(id);
        node?.scrollIntoView({ block: "start" });
      });
      return;
    }
    if (item.kind === "mail" && item.href) {
      window.location.href = item.href;
      return;
    }
    if (item.kind === "external" && item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.kind === "route" && item.href) {
      router.push(item.href);
    }
  }

  function onInputKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((value) => (visible.length ? (value + 1) % visible.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((value) =>
        visible.length ? (value - 1 + visible.length) % visible.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = visible[selected];
      if (item) choose(item);
    }
  }

  return (
    <>
      <PointerField />
      <div className="sticky top-0 z-40">
        <div className="h-[3px] bg-primary" />
        <a
          href="#cover"
          className="sr-only focus:not-sr-only focus:absolute focus:start-3 focus:top-4 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-black"
        >
          {copy.skip}
        </a>
        <header className="border-b border-white/15 bg-black text-white">
          <div className="mx-auto grid h-12 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 border-x border-white/15 px-3 sm:px-4">
            <div className="flex min-w-0 items-baseline gap-2">
              <span className="meta-label text-white">{copy.chrome.docId}</span>
              <span className="hidden text-xs text-white/45 sm:inline">
                {copy.chrome.revLabel} {copy.chrome.rev}
              </span>
            </div>
            <p className="flex items-baseline gap-2 text-xs tabular-nums">
              <span className="hidden text-white/45 md:inline">{copy.chrome.tehran}</span>
              <time dateTime={time}>{time}</time>
            </p>
            <div className="flex items-center justify-end gap-2 sm:gap-3">
              {active ? (
                <span className="hidden text-xs text-white/50 xl:inline">
                  {active.index} {active.label}
                </span>
              ) : null}
              <a
                href={localeHome(otherLocale)}
                hrefLang={otherLocale}
                className={`text-xs text-white underline decoration-primary decoration-2 underline-offset-4 ${
                  locale === "en" ? "font-vazir" : ""
                }`}
              >
                {copy.chrome.language}
              </a>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-2 border border-white/25 px-2.5 text-xs text-white"
                aria-keyshortcuts="Meta+K Control+K"
                aria-expanded={open}
                aria-haspopup="dialog"
                onClick={() => setOpen(true)}
              >
                <span className="sm:hidden">{copy.chrome.index}</span>
                <span className="hidden sm:inline">{modKey === "⌘" ? "⌘K" : "Ctrl K"}</span>
                <span className="sr-only">{copy.chrome.openIndex}</span>
              </button>
            </div>
          </div>
        </header>
      </div>

      <dialog
        ref={dialogRef}
        className="spec-index m-0 h-dvh max-h-none w-full max-w-none border-0 bg-black p-0 text-white"
        aria-label={copy.chrome.index}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col border-x border-white/15">
          <div className="flex items-center justify-between border-b border-white/15 px-4 py-3 sm:px-6">
            <p className="meta-label">{copy.chrome.docId}</p>
            <button
              type="button"
              className="h-10 border border-white/25 px-3 text-xs"
              onClick={() => setOpen(false)}
            >
              {copy.chrome.closeIndex}
            </button>
          </div>
          <label className="sr-only" htmlFor={`${listId}-search`}>
            {copy.chrome.searchLabel}
          </label>
          <input
            ref={inputRef}
            id={`${listId}-search`}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCursor(0);
            }}
            onKeyDown={onInputKey}
            placeholder={copy.chrome.search}
            className="h-14 border-b border-white/15 bg-black px-4 text-lg text-white outline-none placeholder:text-white/35 sm:px-6"
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={visible[selected] ? `${listId}-${selected}` : undefined}
          />
          <ul id={listId} role="listbox" className="min-h-0 flex-1 overflow-y-auto">
            {visible.length === 0 ? (
              <li className="px-4 py-8 text-white/50 sm:px-6">{copy.chrome.empty}</li>
            ) : (
              visible.map((item, index) => {
                const isSelected = index === selected;
                return (
                  <li key={item.key} id={`${listId}-${index}`} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      className={`flex w-full items-stretch gap-4 border-b border-white/10 px-4 py-4 text-start sm:px-6 ${
                        isSelected ? "text-white" : "text-white/55"
                      }`}
                      onMouseEnter={() => setCursor(index)}
                      onClick={() => choose(item)}
                    >
                      <span
                        className={`w-[3px] self-stretch ${isSelected ? "bg-primary" : "bg-transparent"}`}
                        aria-hidden
                      />
                      <span className="w-10 shrink-0 pt-1 text-xs text-primary tabular-nums">
                        {item.index}
                      </span>
                      <span className="display-title text-3xl sm:text-4xl">{item.label}</span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </dialog>
    </>
  );
}
