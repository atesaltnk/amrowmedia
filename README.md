# AMRow Media

A rebuild of [amrowmedia.com](https://amrowmedia.com) — the site of **Alex**, a
photographer and videographer working with small businesses, musicians and
individuals across events, concerts, branding and product work.

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## ⚠️ Read this first

This is a rebuild of the live amrowmedia.com. The gap list below comes from
reviewing the current site directly, so it is an actual audit — not guesswork.

**What the current site gets right, and is preserved here:**

- **The motto.** *"Enhancing your dreams into reality"* is Alex's own line and
  it anchors the manifesto section rather than being replaced.
- **The about copy.** Her paragraph — *"I'm driven by the idea that every dream
  deserves to be realized…"* — is reproduced verbatim on `/about`. It is the
  clearest statement of what she is for that exists anywhere, and rewriting it
  would have been vandalism.
- **First-person voice.** The current site says "Follow **me** on Instagram."
  AMRow Media is one person. That is an advantage over studios hiding behind
  "we", and this build never breaks the "I".
- **The Renegade Pets testimonial**, reproduced as published and attributed to
  Katie + Nick McPherson.
- **The dark palette.** The existing site is dark; so is this.

**What still needs Alex:** every value marked `⚠️` in `lib/site.ts` and
`lib/work.ts`. Chiefly: **the location** (see gap 5 — it is the single biggest
one), the real prices, her kit list, testimonials 2 and 3, and the client names
on three of the six case studies.

**On the case studies specifically:** the `results` blocks contain only
production facts — what was shot, how long it took, what was delivered. They
contain **no invented client business metrics**. Publishing a fabricated "sales
doubled" next to a real named client like Renegade Pets would be a liability,
not just an inaccuracy. If a client will confirm a real outcome in writing,
that is worth more than anything drafted here.

---

## Audit of the current site

Ranked by how much revenue each one moves. Every item is addressed in this build.

| # | What the live site does | Why it costs money | Fixed in |
|---|---|---|---|
| 1 | **No pricing anywhere** | An enquirer cannot self-qualify, so every lead starts with an awkward "what's your budget" exchange, and people who could never afford it still take up the slot. | `lib/site.ts → packages`, `/services#rates` |
| 2 | **Contact is an email address and a "GET IN TOUCH" button** | No project type, no budget, no date. Every enquiry needs three follow-ups before it can be quoted. | `/contact` — qualifying form with inline validation |
| 3 | **Portfolio is an uncaptioned masonry wall** | The photographs are genuinely good — a wrestler mid-throw, two Rottweilers in a packed hall — but an image alone only proves you can operate a camera. No client is named, so no visitor learns that Renegade Pets or Smack are clients. | `/work` + `/work/[slug]` case studies |
| 4 | **No services page** | The hero pipe-list *"EVENTS \| CONCERTS \| BRANDING \| & MORE"* is the entire service description. Nobody can tell what they'd receive. | `/services` — 5 services, deliverables each |
| 5 | **The site never says where she is** | **The biggest gap on the site.** This work is found by searching "event photographer near me". With no location there is no map pack, no local ranking, and no answer for an AI asked to recommend someone in a city. | `site.contact.city` — ⚠️ still needs filling |
| 6 | **No process** | First-time clients — which she says is her market — are not worried about your camera, they're worried about what happens to them. Silence reads as risk. | Home → `ProcessStack` |
| 7 | **No FAQ** | Cost, turnaround, travel and ownership get asked every single time. Answering publicly shortens the sales cycle *and* earns `FAQPage` rich results. | `components/sections/faq.tsx` |
| 8 | **Testimonials are one-at-a-time behind small arrows** | The Renegade Pets quote is excellent and most visitors will never page to it. | Home → `Testimonials`, quote set at display size |
| 9 | **"LET'S CONNECT" set over a busy floral image** | White text directly on high-contrast petals — legibility depends on which flower is behind which letter. | All type sits on a controlled scrim |
| 10 | **No structured data** | Invisible to the map pack and to answer engines. | `LocalBusiness` / `Service` / `VideoObject` / `FAQPage` JSON-LD |
| 11 | **Long centred serif paragraphs on mobile** | Line lengths run past comfortable reading measure. | `max-w-2xl` measures, left-aligned body |
| 12 | **No share cards** | Every link posted to a group chat renders as a grey rectangle. | `app/opengraph-image.tsx` |

## The design system

Two colour grades, and everything on the site is one of them:

- **Negative** — near-black (`#060607`). The default. Footage lives here.
- **Print** — warm paper (`#f4f1ea`). Used exactly twice, to interrupt the dark
  and reset the eye before the closing CTA.

One accent: **tungsten** (`#ff8f3f`) — the colour of the key light on a set,
not an arbitrary brand orange. The secondary is a **teal** fill, which is the
cold half of the teal/orange grade every colourist reaches for.

Type is the **system font stack**. That is a deliberate choice, not a shortcut:
it ships optical sizing and legibility tuning, costs zero bytes, renders
instantly, and causes no layout shift. Swap `--font-display` in
`app/globals.css` if a face is licensed later. Tracking is **size-specific** —
display text runs at `-0.042em` because letters read too far apart as they
grow; mono metadata runs at `+0.14em` so it stays legible small.

### The camera metaphor is load-bearing

Every interface decision maps to something real on a set, which is what stops
the site from being "a dark template with orange buttons":

| Element | What it is |
|---|---|
| Cursor | A viewfinder autofocus reticle. Brackets spread and lock tungsten over anything interactive. |
| Scroll indicator | SMPTE timecode + a blinking REC dot that stops when scrolling stops. A progress bar in the client's own dialect. |
| Hero entrance | Letterbox bars retract from the centre, like a projector masking to aspect. |
| Section entrances | A **focus pull** — blur → sharp. A camera doesn't fade a subject in, it racks the focus ring. |
| Work index | A photographer's contact sheet, sprocket ticks and all, with an irregular grid so six projects don't look like one stock library. |
| Closing CTA | An iris opening — the mirror of the letterbox that opened the page. |
| Grain | A static 4px noise tile. Correct texture for the subject, and it genuinely stops flat blacks banding on 6-bit panels. |

---

## Motion

Built on Apple's *Designing Fluid Interfaces* model. Springs are described by
**damping ratio** and **response**, not mass/stiffness/damping — see
`lib/motion.ts`, where each is mapped to Framer Motion's `bounce` + `duration`.

The rules actually enforced in this codebase:

- **Overshoot is earned by momentum.** Default springs are critically damped
  (`bounce: 0`). Bounce is reserved for sheets and drags — things the user threw.
- **Scroll-linked animation over timed animation.** The pinned reel strip, the
  manifesto line-highlight and the process stack are all driven by scroll
  progress, so the scroll *is* the playhead. Reversing is instant and seamless
  with zero extra code — interruptibility for free.
- **Feedback on pointer-down, never on release.** Every button responds at
  `:active` in 100ms.
- **Compositor properties only.** Everything animates `transform`, `opacity` or
  `filter`. Nothing here triggers layout.
- **Reduced motion is a real path, not a kill switch.** Cross-fades replace
  slides, the pinned strip becomes a vertical stack, the marquee and the grain
  stop, and the custom cursor is removed entirely.

### The hydration trap this codebase avoids

Framer Motion's own `useReducedMotion` reads the media query **during render**,
so any component that branches on it emits different markup on the server than
on a client with the preference set — React then throws a hydration mismatch
and discards the server HTML for that subtree. `hooks/use-reduced-motion.ts`
returns `false` on the server *and* on the first client render, then flips in an
effect. Use it, not the Framer Motion one.

---

## Performance

The site currently makes **zero image, video or font requests.**

Portfolio frames are `components/motion/still.tsx`: a deterministic, seeded SVG
that composes an out-of-focus film frame from the ingredients a real one has —
a key light, a fill, a practical burning out in the background, a horizon,
falloff, bokeh and grain. It renders on the server, weighs about a kilobyte,
and looks different for every project without anyone art-directing it.

It exists so the site is **launchable today** and so a photography portfolio is
never shown as grey boxes. It is scaffolding, not the destination.

### Dropping in real assets

`Still` takes a `src`. Pass one and the procedural frame steps aside entirely:

```tsx
<Still seed={project.seed} grade={project.grade} src="/media/half-light-01.webp" />
```

Recommended sequence:

1. Put stills in `public/media/`. `next.config.mjs` already sets a one-year
   immutable cache header on that path, so use content-hashed filenames.
2. Add `poster` / `frames` fields to each entry in `lib/work.ts` and thread
   them into the `src` props.
3. For the hero, replace the `<Still>` in `components/sections/hero.tsx` with a
   muted autoplaying `<video>` — keep the existing `ScrollScale` wrapper, the
   `poster` attribute, and `playsInline`. Encode at 1080p, under ~3MB, and
   serve a WebP poster so the first paint never waits on video.
4. Swap `clients` in `lib/site.ts` for SVG logos **only** if they can be
   normalised to a single colour and cap height. Mismatched logo PNGs at eleven
   optical weights are the ugliest element on most agency sites — the current
   text treatment is deliberately better than a bad logo wall.

---

## Wiring up the enquiry form

The form posts to `app/api/enquiry/route.ts`, which validates server-side
(length caps, email shape, header-injection stripping) and forwards by email.

```bash
# .env.local
RESEND_API_KEY=re_xxx           # resend.com
ENQUIRY_TO=book@amrowmedia.com
ENQUIRY_FROM=site@amrowmedia.com   # must be a verified sender on the domain
```

Without `RESEND_API_KEY` the route returns 501 and the form falls back to a
**fully pre-filled `mailto:`**. That is deliberate: a contact form that silently
swallows leads is worse than no form, so the site never loses an enquiry even
before the backend is configured.

---

## Structure

```
app/
├── layout.tsx              # metadata, LocalBusiness JSON-LD, chrome
├── page.tsx                # home — the section order is an argument, see comment
├── work/                   # index + [slug] case studies (SSG)
├── services/               # services, rates, FAQ
├── about/                  # studio, beliefs, kit, coverage
├── contact/                # enquiry form
├── api/enquiry/route.ts    # form handler
├── opengraph-image.tsx     # generated share card
├── sitemap.ts · robots.ts
└── globals.css             # the whole design system

components/
├── chrome/                 # header, footer, cursor, HUD, grain
├── motion/                 # reveal, parallax, marquee, magnetic, still
├── sections/               # page sections
└── ui/                     # button, section

lib/
├── site.ts                 # ← all copy, pricing, contact, services
├── work.ts                 # ← all case studies
├── motion.ts               # spring vocabulary
└── utils.ts

hooks/use-reduced-motion.ts # hydration-safe; use this one
```

---

## Pre-launch checklist

Everything marked `⚠️` in the codebase, in priority order:

- [ ] **Set `site.contact.city` / `region` / `geo`** — biggest single win.
      Unblocks the LocalBusiness structured data, which currently degrades to a
      plain `Organization` rather than publishing an invalid empty address
- [ ] Confirm or replace the three price tiers in `lib/site.ts → packages`
- [ ] Answer the travel-radius FAQ (`faqs`, question 3)
- [ ] Transcribe testimonials 2 and 3 from the current site's carousel
- [ ] Add the real client names to the three case studies marked `⚠️`
- [ ] Replace the case study narratives with what actually happened
- [ ] Add a phone number, or leave `phone: ""` and those blocks stay hidden
- [ ] Fill in the kit list on `/about`
- [ ] Add a portrait of Alex on `/about` — for a solo operator this is the
      single most valuable image on the site
- [ ] Drop in real stills across the portfolio (see *Dropping in real assets*)
- [ ] Set `site.domain` to the production URL
- [ ] Configure `RESEND_API_KEY` and send a test enquiry
- [ ] Validate JSON-LD at [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- [ ] Claim/verify the Google Business Profile — the JSON-LD supports it, it
      does not replace it
- [ ] Confirm Renegade Pets, Smack and Tomorrow's Problem are happy to be named
