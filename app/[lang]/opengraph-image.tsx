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
  const [font, photo] = await Promise.all([
    readFile(join(process.cwd(), "fonts/Vazirmatn-Bold.ttf")),
    readFile(join(process.cwd(), "public/images/alisina.png")),
  ]);
  const isFa = locale === "fa";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: isFa ? "row-reverse" : "row",
          background: "#120e1c",
          color: "#f7f4ef",
          fontFamily: "Vazirmatn",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: isFa ? undefined : -80,
            right: isFa ? -80 : undefined,
            width: 460,
            height: 460,
            borderRadius: 999,
            background: "#1d7f8e",
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: isFa ? 80 : 280,
            width: 420,
            height: 420,
            borderRadius: 999,
            background: "#c56a3a",
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: isFa ? undefined : 360,
            left: isFa ? 360 : undefined,
            width: 280,
            height: 280,
            borderRadius: 999,
            background: "#6a3d9a",
            opacity: 0.45,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: 740,
            height: "100%",
            padding: 64,
            position: "relative",
            textAlign: isFa ? "right" : "left",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: isFa ? 0 : 3, opacity: 0.85 }}>
            {isFa ? "مدیر محصول" : "PRODUCT MANAGER"}
          </div>
          <div
            style={{
              fontSize: isFa ? 72 : 78,
              lineHeight: isFa ? 1.25 : 0.95,
              marginTop: 18,
              fontWeight: 700,
            }}
          >
            {copy.hero.nameLines[0]}
          </div>
          <div
            style={{
              fontSize: isFa ? 72 : 78,
              lineHeight: isFa ? 1.25 : 0.95,
              fontWeight: 700,
            }}
          >
            {copy.hero.nameLines[1]}
          </div>
          <div style={{ fontSize: 28, marginTop: 28, lineHeight: 1.35, maxWidth: 620 }}>
            {copy.meta.ogTagline}
          </div>
        </div>
        <img
          alt=""
          src={`data:image/png;base64,${photo.toString("base64")}`}
          width={460}
          height={630}
          style={{ objectFit: "cover", objectPosition: "center 18%" }}
        />
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
