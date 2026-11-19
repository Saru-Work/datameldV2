import { ImageResponse } from "next/og";
import { LOGO_VIEWBOX, logoParts } from "@/lib/logo";
import { site } from "@/lib/site";

export const alt = "DataMeld — web and mobile app development studio in Sri Lanka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f5f6f8",
          color: "#0f1115",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg viewBox={LOGO_VIEWBOX} width={62} height={72} fill="#0f1115">
            <path d={logoParts.shell} />
            <path d={logoParts.pillar} />
            <path d={logoParts.wall} />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1.5 }}>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 76, fontWeight: 500, letterSpacing: -3, lineHeight: 1.05 }}>We engineer software</span>
          <span style={{ fontSize: 76, fontWeight: 500, letterSpacing: -3, lineHeight: 1.05, color: "#868c96" }}>
            businesses run on.
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#4b515b" }}>
          <span>Web apps · Mobile apps</span>
          <span>Jaffna, Sri Lanka</span>
        </div>
      </div>
    ),
    size,
  );
}
