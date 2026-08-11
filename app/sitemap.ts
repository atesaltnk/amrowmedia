import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: site.domain, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.domain}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.domain}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.domain}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.domain}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const studies: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.domain}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...pages, ...studies];
}
