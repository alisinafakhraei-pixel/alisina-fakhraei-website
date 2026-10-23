import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { getDictionary } from "@/lib/content";
import { isLocale } from "@/lib/site";

export const alt = "Alisina Fakhraei — Product Manager";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";
  const copy = getDictionary(locale);
  const font = await readFile(join(process.cwd(), "fonts/Vazirmatn-Bold.ttf"));
  const isFa = locale === "fa";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000",
          color: "#fff",
          padding: 72,
          fontFamily: "Vazirmatn",
          textAlign: isFa ? "right" : "left",
        }}
      >
        <div style={{ width: 64, height: 4, background: "#8ecaf2" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: isFa ? 76 : 84,
              lineHeight: isFa ? 1.25 : 0.98,
              fontWeight: 700,
            }}
          >
            {copy.hero.nameLines[0]}
          </div>
          <div
            style={{
              fontSize: isFa ? 76 : 84,
              lineHeight: isFa ? 1.25 : 0.98,
              fontWeight: 700,
            }}
          >
            {copy.hero.nameLines[1]}
          </div>
          <div style={{ fontSize: 28, marginTop: 28, lineHeight: 1.4, maxWidth: 780 }}>
            {copy.meta.ogTagline}
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#8ecaf2", letterSpacing: isFa ? 0 : 2 }}>
          {isFa ? "مدیر محصول" : "PRODUCT MANAGER"}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Vazirmatn",
          data: font,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
