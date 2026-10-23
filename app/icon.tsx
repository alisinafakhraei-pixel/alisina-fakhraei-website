import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          flexDirection: "column",
          background: "#000",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: -0.4,
          }}
        >
          AF
        </div>
        <div style={{ height: 3, background: "#8ecaf2" }} />
      </div>
    ),
    { ...size },
  );
}
