import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Still } from "@/components/motion/still";
import { Reveal, Split, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Parallax, ScrollFocus } from "@/components/motion/parallax";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "AMRow Media is Alex — a photographer and videographer working with small businesses, musicians and individuals. One person, start to finish.",
  alternates: { canonical: "/about" },
};

/**
 * How I work — ⚠️ drafted from evidence on the live site and the Renegade Pets
 * testimonial. Every one of these should be something Alex actually believes
 * and would say out loud; edit freely.
 *
 * These are written in the first person on purpose. Being one person is the
 * advantage here, not something to disguise with "we".
 */
const BELIEFS = [
  {
    n: "01",
    title: "Bad conditions are the job",
    body: "Hot, humid, raining, packed with people — that is not a shoot going wrong, that is an event. I plan for it rather than apologising for it afterwards, and it is the thing clients bring up most when they recommend me.",
  },
  {
    n: "02",
    title: "One person, start to finish",
    body: "I shoot it, I edit it, I grade it, I deliver it. There is no account manager between you and the person holding the camera, and nobody is learning on your budget. What you saw in the portfolio is what you are hiring.",
  },
  {
    n: "03",
    title: "You do not need the right words",
    body: "Most of my clients have never hired a photographer before and feel like they should arrive with a brief and a moodboard. You do not. Tell me what the thing is for and I will ask the rest.",
  },
  {
    n: "04",
    title: "Fast enough to still matter",
    body: "First selects come back within 48 hours, because a highlight gallery that lands a month later is a keepsake, not marketing. You should be posting while people still remember being there.",
  },
];

/** ⚠️ REPLACE with Alex's actual kit. Clients rarely ask — but the ones who
 *  do, ask early and decide on it. */
const KIT = [
  "⚠️ Camera bodies",
  "⚠️ Primes",
  "⚠️ Zooms",
  "⚠️ Lighting",
  "⚠️ Audio",
  "⚠️ Stabiliser",
  "⚠️ Edit suite",
];

export default function AboutPage() {
  const hasLocation = Boolean(site.contact.city);

  return (
    <>
      <header className="px-gutter pb-20 pt-40">
        <div className="max-w-4xl">
          <Reveal>
            <span className="t-slate text-tungsten">
              About — {site.name}
            </span>
          </Reveal>
          <Split
            as="h1"
            text="Hi, I'm Alex. I'm the whole company."
            className="t-h1 mt-6 text-balance"
          />
        </div>
      </header>

      {/* ---- Portrait + story ---- */}
      <section className="px-gutter pb-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Parallax speed={0.09} className="h-full w-full">
                <div className="h-[122%] w-full">
                  {/* ⚠️ Replace with a portrait of Alex — this is the single
                      most valuable image on the site for a solo operator. */}
                  <Still seed={202} grade="tungsten" />
                </div>
              </Parallax>
              <div className="frame-lines" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:pt-16">
            {/* Her own words, from the live site. Kept as written — this is the
                clearest statement of what she is for that exists anywhere. */}
            <Reveal>
              <p className="t-h3 text-balance">
                I&rsquo;m driven by the idea that every dream deserves to be
                realized.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-5">
              {[
                "My motto captures my commitment to highlighting moments that matter. I focus on events, concerts, branding, and more, with a goal of empowering small businesses, musicians, and individuals to bring their visions to fruition.",
                "Through exceptional videography and photography, I strive to tell your unique story and support you in taking those important initial steps toward your aspirations. Together, let's create captivating visuals that resonate and reflect your ideas beautifully.",
                "In practice that means I work with people who are building something and do not yet have a marketing department. A dog treat company at their first big expo. A band with one van and a release date. A founder who needs a headshot that does not look like a headshot.",
              ].map((para, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="t-body max-w-xl">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Beliefs ---- */}
      <section
        aria-labelledby="beliefs-heading"
        className="bg-print px-gutter py-section text-ink-inverse"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="t-slate text-ink-inverse-2">How I work</span>
          </Reveal>
          <Split
            as="h2"
            text="Four things worth knowing before you book."
            className="t-h1 mt-6 text-balance"
          />

          <Stagger as="ul" className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {BELIEFS.map((b) => (
              <StaggerItem as="li" key={b.n}>
                <span className="t-slate text-tungsten-deep">{b.n}</span>
                <h3 className="t-h3 mt-4 text-ink-inverse">{b.title}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-ink-inverse-2">
                  {b.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <h2 id="beliefs-heading" className="sr-only">
          How I work
        </h2>
      </section>

      {/* ---- Stills band ---- */}
      <section aria-hidden="true" className="grid grid-cols-2 gap-2 p-2 md:grid-cols-4">
        {[301, 314, 327, 340].map((seed, i) => (
          <ScrollFocus
            key={seed}
            maxBlur={8}
            className="relative aspect-[3/4] overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0">
              <Still
                seed={seed}
                grade={(["tungsten", "teal", "night", "bleach"] as const)[i]}
              />
              <div className="frame-lines" />
            </div>
          </ScrollFocus>
        ))}
      </section>

      {/* ---- Kit ---- */}
      <section aria-labelledby="kit-heading" className="py-section">
        <div className="px-gutter">
          <Reveal>
            <span className="t-slate text-tungsten">What I shoot on</span>
          </Reveal>
          <Reveal mode="focus">
            <h2 id="kit-heading" className="t-h2 mt-5 max-w-2xl text-balance">
              The gear matters about a tenth as much as people think. Here it is
              anyway.
            </h2>
          </Reveal>

          <Stagger as="ul" className="mt-12 flex flex-wrap gap-2.5" stagger={0.05}>
            {KIT.map((item) => (
              <StaggerItem as="li" key={item}>
                <span className="inline-block rounded-full border border-negative-edge px-4 py-2 text-[0.9375rem] text-ink-2">
                  {item}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <p className="t-body mt-10 max-w-xl">
              I own what I shoot on, which keeps rental off your quote and means
              nothing falls apart when a date moves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Coverage ----
           Renders only once a location is set in lib/site.ts. Until then the
           section removes itself rather than shipping an empty heading. */}
      {hasLocation && (
        <section
          aria-labelledby="coverage-heading"
          className="border-t border-negative-edge px-gutter py-section"
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="t-slate text-tungsten">Where I shoot</span>
              </Reveal>
              <Reveal mode="focus">
                <h2 id="coverage-heading" className="t-h2 mt-5 text-balance">
                  Based in {site.contact.city}. Frequently not in{" "}
                  {site.contact.city}.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Stagger as="ul" className="flex flex-wrap gap-2.5" stagger={0.05}>
                {site.serviceArea.map((area) => (
                  <StaggerItem as="li" key={area}>
                    <span className="inline-block rounded-full border border-negative-edge px-4 py-2 text-[0.9375rem] text-ink-2">
                      {area}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal delay={0.2}>
                <p className="t-body mt-8 max-w-xl">
                  Travel beyond the local radius goes on the quote at cost, as
                  its own line.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      <Cta />
    </>
  );
}
