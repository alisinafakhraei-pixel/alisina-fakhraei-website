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
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: -0.5,
          borderRadius: 4,
        }}
      >
        AF
      </div>
    ),
    { ...size },
  );
}
