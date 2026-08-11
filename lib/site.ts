/* ============================================================================
   SITE CONFIGURATION — single source of truth
   ----------------------------------------------------------------------------
   Every contact detail, price and piece of headline copy comes from this file.
   Nothing is hardcoded into a component.

   VOICE: first person singular. AMRow Media is Alex — one person who shoots,
   edits, grades and delivers. The existing site is written as "I" and "me"
   ("Follow me on Instagram"), and that is a genuine competitive advantage
   against studios that hide behind "we". Do not let this drift into "we".

   ⚠️  MARKED ⚠️ below = drafted copy awaiting Alex's approval, or a value only
       she can supply. Everything unmarked is taken from the live site.
   ========================================================================== */

export const site = {
  name: "AMRow Media",
  legalName: "AMRow Media",
  owner: "Alex",
  tagline: "Events · Concerts · Branding · & more",

  /** Her own motto, from the live site. Kept deliberately — it is her brand. */
  motto: "Enhancing your dreams into reality",

  /** ⚠️ Drafted headline. Built from the Renegade Pets testimonial, which is
   *  the sharpest real evidence on the current site: she got the shot at a
   *  packed, hot, intermittently raining outdoor event. That is the thing
   *  worth leading with — it is specific, provable, and nobody else claims it. */
  promise: "I get the shot when the room is chaos.",

  domain: "https://amrowmedia.com",

  description:
    "AMRow Media is Alex — a photographer and videographer covering events, concerts, branding and product work for small businesses, musicians and individuals. One person, start to finish.",

  contact: {
    email: "amrowmedia@gmail.com",
    /** Same inbox — kept as a separate key so a booking alias can be added
     *  later without touching every component. */
    bookingEmail: "amrowmedia@gmail.com",
    /** ⚠️ No phone number is published on the live site. Add one here to make
     *  it appear in the footer, contact page and structured data, or leave it
     *  empty and those blocks omit themselves.
     *
     *  These are annotated `as string` rather than left to `as const` on
     *  purpose: an empty literal type narrows every `city ? … : …` check to
     *  `never` and the compiler rejects the filled-in branch you are about to
     *  write. Widening them keeps both branches valid. */
    phone: "" as string,
    phoneHref: "" as string,

    /** ⚠️ BLOCKING FOR LOCAL SEO — the live site never states a location.
     *  That is the single biggest discoverability gap: "photographer near me"
     *  is how this work gets found and right now the site cannot answer it.
     *  Fill these in and the LocalBusiness structured data starts working. */
    city: "" as string,
    region: "" as string,
    regionName: "" as string,
    country: "US",
    street: "By appointment",
    postalCode: "" as string,
    geo: { lat: 0 as number, lng: 0 as number },
  },

  social: [
    { label: "Instagram", handle: "@amrowmedia", href: "https://instagram.com/amrowmedia" },
  ],

  /** ⚠️ Travel radius — replace with the real answer. This drives both the
   *  FAQ and the areaServed structured data. */
  serviceArea: [] as string[],

  /** ⚠️ Drafted. */
  hours: "Replies within one business day · Shoot days by arrangement",
} as const;

/* ---------------------------------------------------------------------------
   NAVIGATION
   ------------------------------------------------------------------------- */

export const nav = [
  { label: "Work", href: "/work", index: "01" },
  { label: "Services", href: "/services", index: "02" },
  { label: "About", href: "/about", index: "03" },
  { label: "Get in touch", href: "/contact", index: "04" },
] as const;

/* ---------------------------------------------------------------------------
   SERVICES
   Built from what the live portfolio actually shows: expos and conventions,
   live music, product and brand work for pet-food companies, food and
   hospitality, portraits, and documentary coverage of makers.

   The live site says "EVENTS | CONCERTS | BRANDING | & MORE". That is the
   right order of priority — it is preserved here, with the "& more" broken
   out into the things the portfolio proves she already does.
   ------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  index: string;
  title: string;
  line: string;
  body: string;
  deliverables: string[];
  grade: "tungsten" | "teal" | "bleach" | "night";
};

export const services: Service[] = [
  {
    slug: "events",
    index: "01",
    title: "Events",
    line: "Expos, conventions, festivals, community days.",
    body:
      "Big rooms, bad light, thousands of people and no second chances. This is the work I am best at — moving through a packed floor and coming back with the frames that make the day look the way it felt. Weather, crowds and a schedule that slipped are all normal and none of them change the delivery.",
    deliverables: [
      "Full event photo gallery",
      "Highlight film (60–90s)",
      "Social clips within 24 hours",
      "Vertical cuts for stories & reels",
      "Exhibitor and booth coverage",
    ],
    grade: "teal",
  },
  {
    slug: "concerts",
    index: "02",
    title: "Concerts & Live Music",
    line: "Shows, sets, press stills, tour content.",
    body:
      "Venue lighting is not a problem to be fixed, it is the look. I shoot for the dark rather than fighting it, and I stay out of the way — no flash in a performer's eyes, no climbing on the monitors. Bands get press-ready stills and cut-down clips they can post before the load-out is finished.",
    deliverables: [
      "Full set photography",
      "Performance video cuts",
      "Press & promo stills",
      "Vertical clips for release day",
      "Venue and crowd coverage",
    ],
    grade: "night",
  },
  {
    slug: "branding",
    index: "03",
    title: "Branding & Product",
    line: "Product shots, brand libraries, packaging, campaigns.",
    body:
      "Small businesses rarely need one photograph — they need a library they can draw on for six months without repeating themselves. So I shoot in batches: one planned day, a set of looks, and a folder of assets sized for every place you actually post.",
    deliverables: [
      "Batch of 20–40 finished assets",
      "Packaging & product detail shots",
      "Lifestyle and in-use frames",
      "9:16, 4:5 and 1:1 crops",
      "Static frames for paid social",
    ],
    grade: "bleach",
  },
  {
    slug: "portraits",
    index: "04",
    title: "Portraits & Personal Brand",
    line: "Headshots, artist press, founders, makers.",
    body:
      "Most people tell me they hate being photographed. That is fine — it is my job to make the session short, specific and not weird. I shoot people while they are talking or working rather than posing, which is why the results look like the person their friends know.",
    deliverables: [
      "Retouched selects (15–40)",
      "Headshot and environmental sets",
      "Web & print resolutions",
      "Usage licence in writing",
      "48-hour turnaround on selects",
    ],
    grade: "tungsten",
  },
  {
    slug: "content-days",
    index: "05",
    title: "Content Days",
    line: "One booked day. A month of posts.",
    body:
      "For businesses that know they should be posting and never have anything to post. We plan a shot list, spend a day making it, and you finish with enough photo and video to cover weeks — captioned, cropped and organised, not dumped in a folder for you to sort out.",
    deliverables: [
      "Full day of photo + video",
      "30+ finished assets",
      "Shot list planned in advance",
      "Captions & platform crops",
      "Organised, labelled delivery",
    ],
    grade: "teal",
  },
];

/* ---------------------------------------------------------------------------
   PRICING
   ⚠️ EVERY FIGURE HERE IS A PLACEHOLDER AND MUST BE REPLACED. ⚠️

   These are pitched at the market the live site describes — "small businesses,
   musicians, and individuals" — not at labels or agencies. Publishing a
   starting number is still the single highest-leverage change available,
   because right now the site gives an enquirer no way to self-qualify at all.

   Set them to whatever the real floor is. The structure works at any level.
   ------------------------------------------------------------------------- */

export type Package = {
  name: string;
  format: string;
  from: number;
  line: string;
  includes: string[];
  best: string;
  featured?: boolean;
};

export const packages: Package[] = [
  {
    name: "The Session",
    format: "Half day",
    from: 450,
    line: "One shoot. One set of deliverables.",
    includes: [
      "Up to 4 hours",
      "Photo or video",
      "20+ edited images",
      "Vertical crops included",
      "One round of revisions",
      "One-week delivery",
    ],
    best: "A single event, a show, a headshot session, a first product shoot.",
  },
  {
    name: "The Day",
    format: "Full day",
    from: 1200,
    line: "A planned day, built to produce a lot.",
    includes: [
      "Up to 8 hours",
      "Photo and video together",
      "30+ finished assets",
      "Shot list planned in advance",
      "Highlight film included",
      "Captions & platform crops",
      "Two rounds of revisions",
      "Two-week delivery",
    ],
    best: "Expos, content days, brand libraries, multi-set shows.",
    featured: true,
  },
  {
    name: "The Ongoing",
    format: "Monthly",
    from: 900,
    line: "Booked every month, at a standing rate.",
    includes: [
      "One shoot day per month",
      "Priority on your dates",
      "Rolling content library",
      "Same-week social turnarounds",
      "Consistent look across months",
      "Rate held for the term",
    ],
    best: "Businesses that post constantly and are tired of scrambling.",
  },
];

/* ---------------------------------------------------------------------------
   PROCESS — ⚠️ drafted; confirm the durations are ones she can hold to.
   ------------------------------------------------------------------------- */

export const process = [
  {
    step: "01",
    title: "You get in touch",
    duration: "Reply in 1 day",
    body:
      "Tell me what the thing is, roughly when, and roughly what you can spend. I will tell you whether I am the right person for it and what it costs — including when the honest answer is that you do not need me.",
  },
  {
    step: "02",
    title: "We plan it",
    duration: "Before anything is booked",
    body:
      "A shot list, a schedule and a fixed price in writing. For a brand or content day that means agreeing the looks in advance. For an event it means knowing what cannot be missed.",
  },
  {
    step: "03",
    title: "I shoot it",
    duration: "The day",
    body:
      "I turn up early, work around what is actually happening, and stay out of the way. Heat, rain, crowds and a schedule that has already slipped are normal conditions, not reasons the shoot went badly.",
  },
  {
    step: "04",
    title: "I edit and grade",
    duration: "48h for selects",
    body:
      "First selects come back within two days so you have something to post while it is still relevant. The full edit, colour and sound follow.",
  },
  {
    step: "05",
    title: "You get everything",
    duration: "1–2 weeks",
    body:
      "Every file, every crop, organised and labelled — not a dump for you to sort out. Yours to use anywhere, for as long as you like.",
  },
] as const;

/* ---------------------------------------------------------------------------
   FAQ — ⚠️ answers drafted; several need Alex's real policy.
   ------------------------------------------------------------------------- */

export const faqs = [
  {
    q: "What does it cost?",
    a: "Half-day sessions start at $450 and full days at $1,200, with monthly retainers from $900. You get a fixed price in writing before anything is booked — no surprise invoices and no hourly creep.",
  },
  {
    q: "How far ahead should I book?",
    a: "Two to three weeks is comfortable. Events with fixed dates are worth locking in as early as you have them. If something is closing in fast, ask anyway — short-notice work is often possible.",
  },
  {
    q: "Do you travel?",
    a: "⚠️ REPLACE — state the radius that is billed as local and how travel beyond it is charged. This is one of the three questions every enquirer asks and answering it in public removes a whole email exchange.",
  },
  {
    q: "Who owns the photos and video?",
    a: "You do. Finished work is yours to use anywhere, for as long as you like. I keep the right to show it in my portfolio — and if a project is under embargo or you would rather I did not, I will not.",
  },
  {
    q: "How fast do I get the files?",
    a: "First selects within 48 hours so you have something to post while it still matters. Full galleries and finished video within one to two weeks depending on scope. Event social clips go out within 24 hours.",
  },
  {
    q: "Do you shoot photo and video at the same time?",
    a: "Yes, and for most events and content days that is the efficient way to buy both. It does need planning in from the start, because the two want different things from a schedule.",
  },
  {
    q: "What if it rains, or the venue is a nightmare?",
    a: "Then it rains and the venue is a nightmare. Hot, humid, packed rooms with bad light are the normal working conditions for this kind of work — planning for them is part of the job, not a reason the shoot underdelivered.",
  },
  {
    q: "I have never hired a photographer before. Is that a problem?",
    a: "No, and most of my clients hadn't either. You do not need a brief, a moodboard or the right words for what you want. Tell me what the thing is for and I will ask the rest.",
  },
] as const;

/* ---------------------------------------------------------------------------
   CLIENTS — taken from the live portfolio and testimonials.
   ⚠️ Confirm each is happy to be named before launch.
   ------------------------------------------------------------------------- */

export const clients = [
  "Renegade Pets",
  "Smack Pet Food",
  "Tomorrow's Problem",
] as const;

/* ---------------------------------------------------------------------------
   TESTIMONIALS
   The first is REAL — reproduced from the live site, attributed as published.
   The live site carries three; only one was legible in the reference material,
   so the other two are marked for transcription from the existing carousel.
   ------------------------------------------------------------------------- */

export const testimonials = [
  {
    quote:
      "Alex isn't afraid to get down and dirty to get the pic when needed! We were at a massive event and it was hot, humid, raining intermittently, packed with people, food and drinks everywhere, and Alex was able to showcase our dog treat company in the mix of it all. She has a great eye and instinct for what needs to be done to give the photo/video a little extra umph! We cannot recommend AMRow Media enough, and would absolutely use her again!",
    name: "Katie + Nick McPherson",
    role: "Renegade Pets",
  },
  {
    quote:
      "⚠️ REPLACE — transcribe testimonial 2 of 3 from the current site's carousel.",
    name: "⚠️ Name",
    role: "⚠️ Company",
  },
  {
    quote:
      "⚠️ REPLACE — transcribe testimonial 3 of 3 from the current site's carousel.",
    name: "⚠️ Name",
    role: "⚠️ Company",
  },
] as const;

/* ---------------------------------------------------------------------------
   SERVICE PROMISES
   Shown as the numbers block on the home page. These are deliberately
   commitments rather than career statistics — a solo operator's real
   advantage is turnaround and continuity, and unlike "260 films delivered"
   these are things Alex controls and can actually stand behind.
   ------------------------------------------------------------------------- */

export const promises = [
  { value: "48h", label: "First selects, every time" },
  { value: "1", label: "Person, start to finish" },
  { value: "0", label: "Subcontractors, ever" },
  { value: "24h", label: "Event clips, same day next" },
] as const;
