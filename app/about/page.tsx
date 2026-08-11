import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Still } from "@/components/motion/still";
import { Reveal, Split, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Parallax, ScrollFocus } from "@/components/motion/parallax";
import { Marquee } from "@/components/motion/marquee";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Amrow Media is a small video and photo production studio in Nashville, Tennessee. How we work, what we believe, and what is in the case.",
  alternates: { canonical: "/about" },
};

/** What we believe — the part clients actually choose a studio on. */
const BELIEFS = [
  {
    n: "01",
    title: "A quiet set is a feature",
    body: "The best performance anyone gives is the one where they forgot the camera was there. That is a production discipline, not a personality trait, and it is the thing our clients cite most often.",
  },
  {
    n: "02",
    title: "The argument comes before the shot list",
    body: "We will not start talking about lenses until we agree on what the film has to make someone believe. A gorgeous film that wins nothing is the most expensive thing you can buy.",
  },
  {
    n: "03",
    title: "Small crews, senior people",
    body: "Everyone on your shoot has done this for years. There is no junior learning on your budget, and there is nobody standing around because the call sheet said there should be six of us.",
  },
  {
    n: "04",
    title: "We will tell you not to hire us",
    body: "If the honest answer is that a film is the wrong spend right now, you will hear it on the first call. It costs us a job occasionally and it is the reason most of our work is repeat business.",
  },
];

/** Kit. Clients rarely ask — but the ones who do, ask early and decide on it. */
const KIT = [
  "Sony FX6 / FX3 bodies",
  "Sigma Cine primes",
  "DZOFILM zooms",
  "Aputure 600d / 300x",
  "Astera tubes",
  "DJI RS4 / Ronin",
  "Sennheiser & Rode wireless",
  "Sound Devices MixPre",
  "DaVinci Resolve Studio",
  "Calibrated grade suite",
];

export default function AboutPage() {
  return (
    <>
      <header className="px-gutter pb-20 pt-40">
        <div className="max-w-4xl">
          <Reveal>
            <span className="t-slate text-tungsten">
              Studio — {site.contact.city}, {site.contact.regionName}
            </span>
          </Reveal>
          <Split
            as="h1"
            text="A small studio that takes the work seriously and itself less so."
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
                  <Still seed={202} grade="tungsten" />
                </div>
              </Parallax>
              <div className="frame-lines" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:pt-16">
            <Reveal>
              <p className="t-h3 text-balance">
                We started in 2019 with one camera and a standing invitation to
                film in the back room of a bar on Gallatin Avenue.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-5">
              {[
                "Seven years later the room is bigger, the kit is insured, and the invitation still stands. Most of what we shoot is still music — this is Nashville, and half the people we film have a guitar in the back of the car — but the work has grown into brand films, campaigns, live coverage and the kind of photography that clients used to buy from someone else.",
                "What has not changed is the size. There are a small number of us and we all still go on the shoots. When you hire Amrow you get the people who made the reel, not their calendar and a subcontractor.",
                "We are not trying to become an agency. We are trying to be the studio that a Nashville artist team or a good local business calls first, and keeps calling.",
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
            <span className="t-slate text-ink-inverse-2">How we work</span>
          </Reveal>
          <Split
            as="h2"
            text="Four things we actually believe."
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
          How we work
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
            <span className="t-slate text-tungsten">In the case</span>
          </Reveal>
          <Reveal mode="focus">
            <h2 id="kit-heading" className="t-h2 mt-5 max-w-2xl text-balance">
              The gear matters about a tenth as much as people think. Here it is
              anyway.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 border-y border-negative-edge py-8">
          <Marquee duration={46} velocitySkew={false}>
            {KIT.map((item) => (
              <span key={item} className="mx-6 flex items-center gap-6 whitespace-nowrap">
                <span className="text-lg tracking-[-0.02em] text-ink-2">{item}</span>
                <span className="h-1 w-1 rounded-full bg-tungsten" aria-hidden="true" />
              </span>
            ))}
          </Marquee>
        </div>

        <div className="px-gutter">
          <Reveal>
            <p className="t-body mt-10 max-w-xl">
              We own everything on that list, which means no rental day-rate on
              your quote and no scrambling when a shoot moves. Anything more
              specialist we bring in from the same three Nashville houses we
              have used for years.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Coverage ---- */}
      <section
        aria-labelledby="coverage-heading"
        className="border-t border-negative-edge px-gutter py-section"
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="t-slate text-tungsten">Where we shoot</span>
            </Reveal>
            <Reveal mode="focus">
              <h2 id="coverage-heading" className="t-h2 mt-5 text-balance">
                Based in Nashville. Frequently not in Nashville.
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
                Anything within three hours of the studio is billed as local.
                Beyond that, travel goes on the quote at cost — no markup, no
                mystery line item.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
