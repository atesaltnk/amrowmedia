import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, getProject, getNextProject } from "@/lib/work";
import { site } from "@/lib/site";
import { Still } from "@/components/motion/still";
import { Reveal, Stagger, StaggerItem, Split } from "@/components/motion/reveal";
import { Parallax, ScrollFocus } from "@/components/motion/parallax";
import { Cta } from "@/components/sections/cta";

/** Pre-render every case study at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${project.client}`,
    description: `${project.line} A ${project.category.toLowerCase()} project by ${site.name} for ${project.client}.`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${project.client}`,
      description: project.line,
      type: "article",
    },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);

  /* VideoObject structured data. This is what puts a film into video search
     results and lets an answer engine describe the project accurately rather
     than guessing from the page title. */
  const videoJson = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${project.title} — ${project.client}`,
    description: project.brief,
    duration: project.runtime,
    uploadDate: `${project.year}-01-01`,
    thumbnailUrl: `${site.domain}/opengraph-image`,
    creator: { "@type": "Organization", name: site.name, url: site.domain },
    producer: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <article>
        {/* ---- Title block ---- */}
        <header className="px-gutter pb-16 pt-40">
          <Reveal>
            <Link
              href="/work"
              className="t-slate inline-flex items-center gap-2 text-ink-3 transition-colors hover:text-tungsten"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              All work
            </Link>
          </Reveal>

          <div className="mt-10 max-w-5xl">
            <Reveal>
              <span className="t-slate text-tungsten">
                {project.client} · {project.category} · {project.year}
              </span>
            </Reveal>
            <Split as="h1" text={project.title} className="t-h1 mt-6" />
            <Reveal delay={0.15}>
              <p className="t-lead mt-8 max-w-2xl text-pretty">{project.line}</p>
            </Reveal>
          </div>
        </header>

        {/* ---- Hero frame ---- */}
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Parallax speed={0.12} className="h-full w-full">
            <div className="h-[130%] w-full">
              <Still seed={project.seed} grade={project.grade} priority />
            </div>
          </Parallax>
          <div className="halation" />
          <div className="frame-lines" />
        </div>

        {/* ---- Results ---- */}
        <section
          aria-label="Results"
          className="border-b border-negative-edge bg-negative-lift px-gutter py-16"
        >
          <Stagger as="ul" className="grid gap-10 sm:grid-cols-3" stagger={0.09}>
            {project.results.map((r) => (
              <StaggerItem as="li" key={r.label}>
                <span className="block text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-none tracking-[-0.04em] text-tungsten">
                  {r.value}
                </span>
                <span className="t-slate mt-4 block text-ink-2">{r.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ---- The narrative ----
             Brief → constraint → approach → outcome. This sequence is the
             whole point of a case study: the constraint is what makes a
             prospective client recognise their own situation in it. */}
        <div className="px-gutter py-section">
          <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-14 lg:grid-cols-12">
            {(
              [
                ["The brief", project.brief],
                ["What made it hard", project.constraint],
                ["What we did", project.approach],
                ["What happened", project.outcome],
              ] as const
            ).map(([heading, body], i) => (
              <Reveal
                key={heading}
                as="section"
                className="lg:col-span-6"
                delay={i * 0.05}
              >
                <h2 className="t-slate mb-5 text-tungsten">{heading}</h2>
                <p className="t-lead text-pretty">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---- Stills pair ---- */}
        <div className="grid gap-3 px-gutter pb-section md:grid-cols-2">
          <ScrollFocus className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <div className="absolute inset-0">
              <Still seed={project.seed + 5} grade={project.grade} />
              <div className="frame-lines" />
            </div>
          </ScrollFocus>
          <ScrollFocus className="relative aspect-[4/5] overflow-hidden rounded-sm md:mt-24">
            <div className="absolute inset-0">
              <Still seed={project.seed + 12} grade={project.grade} letterbox />
              <div className="frame-lines" />
            </div>
          </ScrollFocus>
        </div>

        {/* ---- Deliverables & credits ---- */}
        <section className="bg-print px-gutter py-section text-ink-inverse">
          <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
            <div>
              <h2 className="t-slate mb-7 text-ink-inverse-2">Delivered</h2>
              <ul className="flex flex-col">
                {project.deliverables.map((d) => (
                  <li
                    key={d}
                    className="border-b border-print-edge py-4 text-lg tracking-[-0.015em]"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="t-slate mb-7 text-ink-inverse-2">Credits</h2>
              <ul className="flex flex-col">
                {project.credits.map((c) => (
                  <li
                    key={c.role}
                    className="flex items-baseline justify-between gap-6 border-b border-print-edge py-4"
                  >
                    <span className="t-slate text-ink-inverse-2">{c.role}</span>
                    <span className="text-lg tracking-[-0.015em]">{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---- Next ---- */}
        <Link
          href={`/work/${next.slug}`}
          className="group relative block overflow-hidden"
          data-reticle="Next"
        >
          <div className="relative aspect-[21/8] w-full">
            <div className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.04]">
              <Still seed={next.seed} grade={next.grade} />
            </div>
            <div className="absolute inset-0 bg-negative/70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-gutter text-center">
              <span className="t-slate text-tungsten">Next project</span>
              <span className="t-h1 mt-4 flex items-center gap-4">
                {next.title}
                <ArrowRight
                  className="h-8 w-8 transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-2"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </Link>
      </article>

      <Cta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJson) }}
      />
    </>
  );
}
