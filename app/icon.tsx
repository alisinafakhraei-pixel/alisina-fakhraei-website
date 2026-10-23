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
          background: "#2d4fe0",
          color: "#f7f8ff",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: -0.5,
          borderRadius: 10,
        }}
      >
        AF
      </div>
    ),
    { ...size },
  );
}
