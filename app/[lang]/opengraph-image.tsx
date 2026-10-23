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
          background: "#f4f1fb",
          padding: 36,
          fontFamily: "Vazirmatn",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            background: "#2d4fe0",
            color: "#f7f8ff",
            borderRadius: 56,
            padding: 56,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -90,
              right: isFa ? undefined : -70,
              left: isFa ? -70 : undefined,
              width: 280,
              height: 280,
              borderRadius: 999,
              background: "#ffe14a",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -80,
              left: isFa ? undefined : -40,
              right: isFa ? -40 : undefined,
              width: 220,
              height: 220,
              borderRadius: 80,
              background: "#9eefd8",
            }}
          />
          <div style={{ fontSize: 22, letterSpacing: isFa ? 0 : 2, zIndex: 1 }}>
            {isFa ? "مدیر محصول" : "PRODUCT MANAGER"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
            <div
              style={{
                fontSize: isFa ? 78 : 86,
                lineHeight: isFa ? 1.25 : 0.92,
                fontWeight: 700,
                textAlign: isFa ? "right" : "left",
              }}
            >
              {copy.hero.nameLines[0]}
            </div>
            <div
              style={{
                fontSize: isFa ? 78 : 86,
                lineHeight: isFa ? 1.25 : 0.92,
                fontWeight: 700,
                textAlign: isFa ? "right" : "left",
              }}
            >
              {copy.hero.nameLines[1]}
            </div>
            <div
              style={{
                fontSize: 30,
                marginTop: 28,
                lineHeight: 1.35,
                maxWidth: 760,
                textAlign: isFa ? "right" : "left",
              }}
            >
              {copy.meta.ogTagline}
            </div>
          </div>
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
