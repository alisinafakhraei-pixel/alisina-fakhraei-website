import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex, Vazirmatn } from "next/font/google";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/content";
import { isLocale, SITE_URL, type Locale } from "@/lib/site";

import "../globals.css";

const sans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  axes: ["opsz"],
});

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fa" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const copy = getDictionary(locale);
  const canonical = locale === "fa" ? `${SITE_URL}/fa` : `${SITE_URL}/`;

  return {
    metadataBase: new URL(SITE_URL),
    title: copy.meta.title,
    description: copy.meta.description,
    authors: [{ name: "Alisina Fakhraei", url: SITE_URL }],
    creator: "Alisina Fakhraei",
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/`,
        fa: `${SITE_URL}/fa`,
        "x-default": `${SITE_URL}/`,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: copy.meta.title,
      description: copy.meta.description,
      siteName: "Alisina Fakhraei",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      alternateLocale: locale === "fa" ? ["en_US"] : ["fa_IR"],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={lang === "fa" ? "rtl" : "ltr"}
      className={`${sans.variable} ${vazir.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
