import type { Metadata } from "next";
import { WorkGrid } from "@/components/sections/work-grid";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected event, concert, branding and product work by AMRow Media — photography and video for small businesses, musicians and individuals.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <WorkGrid />
      <Cta />
    </>
  );
}
