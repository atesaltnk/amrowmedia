# Amrow Media

A production-ready website for **Amrow Media**, a Nashville video & photo production studio.

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## ⚠️ Read this first

**The live amrowmedia.com could not be reached from the environment this was
built in** — the outbound proxy blocks that host, and archive.org was blocked
too. So this is **not** an audit of the existing site. It is a build against
what this category of business demonstrably needs, from public signals
(`@amrowmedia` on Instagram — Nashville videographer + photographer) and the
brief: English, dark, cinematic.

Two consequences:

1. **All copy, pricing, project case studies, client names, testimonials and
   contact details are drafted placeholders.** They are realistic and
   internally consistent so the site can be reviewed as a finished thing — but
   every figure needs replacing with the studio's real numbers before launch.
   Everything lives in two files: `lib/site.ts` and `lib/work.ts`.
2. **The gap list below is a category checklist**, not a list of confirmed
   faults on the current site. Tick off whatever is already handled.

---

## What a studio site in this category has to do

Ranked by how much revenue each one moves. Every item is implemented here.

| # | Gap | Why it costs money | Where it lives |
|---|-----|--------------------|----------------|
| 1 | **No published pricing** | The single biggest lead filter. Without it every enquiry starts with an awkward call, and the people who could never afford you still take up the slot. | `lib/site.ts → packages`, `/services#rates` |
| 2 | **A DM link instead of a booking form** | An Instagram DM has no budget field, no timeline, no project type. Every enquiry needs three follow-ups before it's qualified. | `/contact`, `components/sections/enquiry-form.tsx` |
| 3 | **Thumbnails instead of case studies** | Pretty frames prove you can run a camera. Brief → constraint → approach → outcome proves you can be trusted with a budget. Different purchase. | `/work/[slug]`, `lib/work.ts` |
| 4 | **No LocalBusiness structured data** | Buyers search *"videographer near me."* Without JSON-LD the business is invisible to the map pack and to AI answer engines regardless of the work's quality. | `app/layout.tsx → StructuredData` |
| 5 | **No process explained** | First-time clients aren't worried about your camera, they're worried about what happens to them. Silence here reads as risk. | Home → `ProcessStack`, five steps with real durations |
| 6 | **No FAQ** | Ownership, turnaround, travel, revisions. Answering in public shortens the sales cycle *and* earns `FAQPage` rich results. | `components/sections/faq.tsx` |
| 7 | **Media-heavy and slow** | A production site that takes eight seconds to load has disproven its own pitch before the reel plays. | No video files, no web fonts, no image requests — see *Performance* |
| 8 | **No share cards** | Every link posted to Slack, iMessage or a group chat renders as a grey rectangle. | `app/opengraph-image.tsx`, generated at build |
| 9 | **Motion that ignores accessibility** | A heavily animated site with no reduced-motion path is unusable for a real slice of visitors. | `hooks/use-reduced-motion.ts`, honoured in every component |
| 10 | **No local SEO surface** | "Nashville" appears in the metadata, the JSON-LD, the service area list and the copy — not just in a logo. | `app/layout.tsx`, `lib/site.ts → serviceArea` |

---

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
`app/globals.css` if the studio licenses a face. Tracking is **size-specific** —
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
| Work index | A photographer's contact sheet, sprocket ticks and all, with an irregular grid so six films don't look like one stock library. |
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

- [ ] Replace every value in `lib/site.ts` — phone, email, address, hours, socials
- [ ] Replace the six case studies in `lib/work.ts` with real projects
- [ ] Confirm or change the three price tiers
- [ ] Swap client names for real ones (or remove the strip)
- [ ] Replace testimonials with attributed, permitted quotes
- [ ] Add real stills and a hero reel (see *Dropping in real assets*)
- [ ] Set `site.domain` to the production URL — metadata, canonicals, sitemap
      and JSON-LD all derive from it
- [ ] Set the real studio coordinates in `site.contact.geo`
- [ ] Configure `RESEND_API_KEY` and send a test enquiry
- [ ] Validate the JSON-LD at [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- [ ] Claim/verify the Google Business Profile — the JSON-LD supports it, it
      does not replace it
