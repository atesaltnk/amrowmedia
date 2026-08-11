import { ImageResponse } from "next/og";

/** Favicon: the tungsten key light on near-black. Generated, so there is no
 *  binary asset to keep in sync with the palette. */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#060607",
          color: "#ff8f3f",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        A
      </div>
    ),
    size
  );
}
