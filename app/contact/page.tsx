import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/lib/site";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { Reveal, Split } from "@/components/motion/reveal";
import { Still } from "@/components/motion/still";
import { Faq } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "Start a project",
  description: `Book Amrow Media for video or photo production in Nashville. Tell us what the project has to achieve and we will reply within one business day with a straight answer on cost and fit.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <header className="px-gutter pb-16 pt-40">
        <div className="max-w-4xl">
          <Reveal>
            <span className="t-slate text-tungsten">
              Start a project — reply within one business day
            </span>
          </Reveal>
          <Split
            as="h1"
            text="Tell us what it has to do."
            className="t-h1 mt-6 text-balance"
          />
          <Reveal delay={0.15}>
            <p className="t-lead mt-8 max-w-2xl text-pretty">
              The more specific you are about the outcome, the more useful the
              reply. If you already know the budget, say so — it is the fastest
              way to a real answer rather than a discovery call.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="px-gutter pb-section">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            {/* useSearchParams needs a Suspense boundary to keep the rest of
                the page statically rendered. */}
            <Suspense
              fallback={
                <div className="h-[600px] animate-pulse rounded-xl bg-negative-lift" />
              }
            >
              <EnquiryForm />
            </Suspense>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 flex flex-col gap-10">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Still seed={404} grade="teal" />
                <div className="frame-lines" />
              </div>

              <div>
                <h2 className="t-slate mb-5 text-ink-3">Or, directly</h2>
                <ul className="flex flex-col gap-4">
                  <li>
                    <a
                      href={`mailto:${site.contact.bookingEmail}`}
                      className="text-lg tracking-[-0.02em] text-ink transition-colors hover:text-tungsten"
                    >
                      {site.contact.bookingEmail}
                    </a>
                    <span className="t-slate mt-1 block text-ink-3">
                      New projects
                    </span>
                  </li>
                  <li>
                    <a
                      href={site.contact.phoneHref}
                      className="text-lg tracking-[-0.02em] text-ink transition-colors hover:text-tungsten"
                    >
                      {site.contact.phone}
                    </a>
                    <span className="t-slate mt-1 block text-ink-3">
                      {site.hours}
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="t-slate mb-5 text-ink-3">Elsewhere</h2>
                <ul className="flex flex-col gap-3">
                  {site.social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-baseline gap-3 text-ink-2 transition-colors hover:text-ink"
                      >
                        <span className="t-slate w-20 shrink-0 text-ink-3">
                          {s.label}
                        </span>
                        <span>{s.handle}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="material-card rounded-xl p-6">
                <h2 className="t-slate mb-3 text-tungsten">Before you write</h2>
                <p className="t-body text-[0.9375rem]">
                  Most enquiries land between $2,500 and $15,000. If your budget
                  is under that, say so anyway — we keep space each month for
                  first releases and artist-owned projects at a reduced rate.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Faq />
    </>
  );
}
