import type { Metadata } from "next";
import { services, site } from "@/lib/site";
import { Still } from "@/components/motion/still";
import { Reveal, Split } from "@/components/motion/reveal";
import { Aperture } from "@/components/motion/parallax";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Services & rates",
  description:
    "Video and photo production services from Amrow Media in Nashville — music videos, brand films, commercial and social campaigns, live event coverage, photography and weddings. Published starting rates.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  /* Each service is a real, priced offering — mark them up as such so search
     and answer engines can enumerate what this studio actually sells. */
  const json = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} services`,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.line,
        serviceType: s.title,
        provider: { "@type": "LocalBusiness", name: site.name, url: site.domain },
        areaServed: { "@type": "City", name: site.contact.city },
      },
    })),
  };

  return (
    <>
      <header className="px-gutter pb-20 pt-40">
        <div className="max-w-4xl">
          <Reveal>
            <span className="t-slate text-tungsten">
              Services — {services.length} disciplines
            </span>
          </Reveal>
          <Split
            as="h1"
            text="What you can actually book."
            className="t-h1 mt-6 text-balance"
          />
          <Reveal delay={0.15}>
            <p className="t-lead mt-8 max-w-2xl text-pretty">
              Scope, deliverables and starting rates in public. If what you need
              is not on this list, say so anyway — we would rather point you at
              the right studio than take the job and learn on your budget.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Each service alternates side, so the page has a rhythm rather than a
          column of identical blocks. */}
      {services.map((service, i) => (
        <section
          key={service.slug}
          id={service.slug}
          className="border-t border-negative-edge px-gutter py-20"
          style={{ scrollMarginTop: "5rem" }}
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div
              className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}
            >
              <Aperture from={72}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                  <Still seed={i * 23 + 9} grade={service.grade} />
                  <div className="frame-lines" />
                </div>
              </Aperture>
            </div>

            <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <Reveal>
                <span className="t-slate text-tungsten">{service.index}</span>
              </Reveal>
              <Reveal mode="focus">
                <h2 className="t-h1 mt-4">{service.title}</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="t-lead mt-6 max-w-xl text-pretty">{service.body}</p>
              </Reveal>

              <Reveal delay={0.2}>
                <h3 className="t-slate mb-4 mt-10 text-ink-3">
                  Typically delivered
                </h3>
                <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {service.deliverables.map((d) => (
                    <li
                      key={d}
                      className="border-b border-negative-edge py-2.5 text-[0.9375rem] text-ink-2"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <Pricing />
      <Faq />
      <Cta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
    </>
  );
}
