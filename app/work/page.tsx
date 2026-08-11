import type { Metadata } from "next";
import { WorkGrid } from "@/components/sections/work-grid";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected video and photography projects from Amrow Media — brand films, music videos, live sessions, commercial campaigns and editorial photography made in Nashville.",
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
