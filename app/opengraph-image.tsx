import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/* Generated at build time so every share card is on-brand without anyone
   opening a design tool. Uses the same tungsten key and near-black as the site. */

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060607",
          padding: 72,
          position: "relative",
        }}
      >
        {/* The tungsten key, falling off toward the corner. */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -120,
            width: 900,
            height: 700,
            background:
              "radial-gradient(circle at 40% 40%, rgba(255,143,63,0.42), rgba(255,143,63,0) 62%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", zIndex: 1 }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#f4f1ea",
              fontWeight: 600,
            }}
          >
            AMROW
          </span>
          <span style={{ fontSize: 20, letterSpacing: 3, color: "#6b6862" }}>
            {site.contact.city
              ? `${site.contact.city.toUpperCase()}, ${site.contact.region}`
              : "PHOTO & VIDEO"}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <span
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: -3.5,
              color: "#f4f1ea",
              fontWeight: 600,
              maxWidth: 940,
            }}
          >
            I get the shot when the room is{" "}
            <span style={{ color: "#ff8f3f" }}>chaos.</span>
          </span>
          <span style={{ marginTop: 28, fontSize: 26, color: "#a8a49c" }}>
            {site.tagline}
          </span>
        </div>
      </div>
    ),
    size
  );
}
