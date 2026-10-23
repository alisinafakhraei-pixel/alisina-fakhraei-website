import { HomeView } from "@/components/home-view";
import { getDictionary } from "@/lib/content";
import { companyLinks, isLocale, LINKEDIN, MAILTO, SITE_URL } from "@/lib/site";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const copy = getDictionary(lang);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alisina Fakhraei",
    alternateName: "علیسینا فخرایی",
    jobTitle: lang === "fa" ? "مدیر محصول" : "Product Manager",
    description: copy.meta.description,
    email: MAILTO,
    url: lang === "fa" ? `${SITE_URL}/fa` : `${SITE_URL}/`,
    image: `${SITE_URL}/images/alisina.png`,
    sameAs: [LINKEDIN],
    worksFor: [
      {
        "@type": "Organization",
        name: "Formaloo",
        url: companyLinks.formaloo,
      },
      {
        "@type": "Organization",
        name: "VaDostan",
        url: companyLinks.vadostan,
      },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Sharif University of Technology",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeView locale={lang} copy={copy} />
    </>
  );
}
