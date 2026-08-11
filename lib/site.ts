/* ============================================================================
   SITE CONFIGURATION — single source of truth
   ----------------------------------------------------------------------------
   Every phone number, price, address and piece of headline copy on the site
   comes from this file. Nothing is hardcoded into a component. Change a rate
   here and it updates on the pricing page, the JSON-LD, and the contact form
   budget selector at once.

   ⚠️  REVIEW BEFORE LAUNCH — contact details and pricing below are drafted
       placeholders. Replace with the studio's real figures.
   ========================================================================== */

export const site = {
  name: "Amrow Media",
  legalName: "Amrow Media LLC",
  tagline: "Nashville video & photo production",
  domain: "https://amrowmedia.com",

  /** The positioning line. Everything else on the site is evidence for it. */
  promise: "We shoot the moment the room goes quiet.",

  description:
    "Amrow Media is a Nashville video and photo production studio making brand films, music videos, live sessions and stills for artists, labels and companies who need the work to feel like something.",

  contact: {
    email: "hello@amrowmedia.com",
    bookingEmail: "book@amrowmedia.com",
    phone: "+1 (615) 555-0142",
    phoneHref: "tel:+16155550142",
    city: "Nashville",
    region: "TN",
    regionName: "Tennessee",
    country: "US",
    /** Studio address — used for LocalBusiness structured data. */
    street: "By appointment",
    postalCode: "37203",
    /** Downtown Nashville. Update to the real studio coordinates. */
    geo: { lat: 36.1627, lng: -86.7816 },
  },

  social: [
    { label: "Instagram", handle: "@amrowmedia", href: "https://instagram.com/amrowmedia" },
    { label: "Vimeo", handle: "amrowmedia", href: "https://vimeo.com/amrowmedia" },
    { label: "YouTube", handle: "@amrowmedia", href: "https://youtube.com/@amrowmedia" },
  ],

  /** Where we actually work. Drives the "travel" answer and local SEO. */
  serviceArea: [
    "Nashville",
    "Franklin",
    "Memphis",
    "Chattanooga",
    "Knoxville",
    "Atlanta",
    "Louisville",
    "Anywhere the job is",
  ],

  hours: "Mon–Fri 9:00–18:00 CT · Shoot days are whenever the light is right",
} as const;

/* ---------------------------------------------------------------------------
   NAVIGATION
   Labels name their contents. "Work", "Services", "Studio" — never "Home" or
   an umbrella nobody can predict the contents of.
   ------------------------------------------------------------------------- */

export const nav = [
  { label: "Work", href: "/work", index: "01" },
  { label: "Services", href: "/services", index: "02" },
  { label: "Studio", href: "/about", index: "03" },
  { label: "Start a project", href: "/contact", index: "04" },
] as const;

/* ---------------------------------------------------------------------------
   SERVICES
   ------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  index: string;
  title: string;
  line: string;
  body: string;
  deliverables: string[];
  /** Used for the colour grade of the section's generated still. */
  grade: "tungsten" | "teal" | "bleach" | "night";
};

export const services: Service[] = [
  {
    slug: "music",
    index: "01",
    title: "Music & Artist",
    line: "Music videos, live sessions, EPKs, press stills.",
    body:
      "This is Nashville. Half of what we shoot has a guitar in it. We work the way artist teams actually work — fast turnarounds around tour dates, deliverables cut for every platform, and a set that a nervous artist can relax on.",
    deliverables: [
      "Music video (1×90–240s)",
      "Live session films (2–4 songs)",
      "Vertical performance cuts",
      "EPK / press kit film",
      "Artist press stills",
    ],
    grade: "tungsten",
  },
  {
    slug: "brand",
    index: "02",
    title: "Brand Films",
    line: "The film a company shows when it needs to be believed.",
    body:
      "Founder stories, manifestos, recruitment films, launch pieces. We start with the argument the film has to win, not the shot list. If a talking head is the wrong answer we will say so before you have paid for a crew.",
    deliverables: [
      "Hero film (60–180s)",
      "Cutdowns (30s / 15s / 6s)",
      "Vertical & square masters",
      "Interview transcripts",
      "Stills from the shoot day",
    ],
    grade: "teal",
  },
  {
    slug: "commercial",
    index: "03",
    title: "Commercial & Social",
    line: "Ad creative built for the feed, not retrofitted to it.",
    body:
      "Performance creative that is designed vertical-first, with the hook in the first eighteen frames. We shoot in batches so a single day yields a month of assets, which is the only way the maths works on social spend.",
    deliverables: [
      "Batch of 6–20 social assets",
      "Hook variants for testing",
      "9:16, 4:5 and 1:1 masters",
      "Captions & subtitle files",
      "Static frames for paid",
    ],
    grade: "bleach",
  },
  {
    slug: "events",
    index: "04",
    title: "Events & Live",
    line: "Conferences, festivals, tour nights, launches.",
    body:
      "Multi-camera coverage with a same-week sizzle so the momentum is not gone before the edit lands. We have shot rooms of nine and rooms of nine thousand, and the discipline is identical: get the moment, do not become the moment.",
    deliverables: [
      "Same-week sizzle (60–90s)",
      "Full-length session recordings",
      "Multi-cam speaker edits",
      "Event photography gallery",
      "Social clips within 24h",
    ],
    grade: "night",
  },
  {
    slug: "photo",
    index: "05",
    title: "Photography",
    line: "Portrait, editorial, product, documentary.",
    body:
      "Stills are not the consolation prize on a video shoot. They get their own lighting plan, their own time on the schedule, and a retoucher who knows the difference between clean and plastic.",
    deliverables: [
      "Retouched selects (25–150)",
      "Full contact sheet",
      "Web & print resolutions",
      "Usage licence in writing",
      "48h turnaround on selects",
    ],
    grade: "bleach",
  },
  {
    slug: "weddings",
    index: "06",
    title: "Weddings",
    line: "One film. Made like a film.",
    body:
      "We take a small number of weddings a year and treat each one like a short. No drone-over-the-venue template, no cliché first-look montage cut to a licensed pop song. The day as it happened, in the order it happened.",
    deliverables: [
      "Feature film (8–14 min)",
      "Highlight film (3–4 min)",
      "Full ceremony & speeches",
      "Documentary photo coverage",
      "Archive of all raw footage",
    ],
    grade: "tungsten",
  },
];

/* ---------------------------------------------------------------------------
   PRICING
   Named after record formats, because the client base is a music town and
   "Tier 2" has never once made anyone want to book a shoot.

   Publishing a starting price is the single highest-leverage change a
   production site can make: it filters out the enquiries that were never going
   to close and it removes the awkward first call.
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
    name: "The Single",
    format: "7-inch",
    from: 2500,
    line: "One shoot day. One finished piece.",
    includes: [
      "Half or full shoot day",
      "Director + operator",
      "One hero deliverable",
      "Three vertical cutdowns",
      "Colour grade & sound mix",
      "Two rounds of revisions",
      "Two-week delivery",
    ],
    best: "A launch, a single, a first proper film.",
  },
  {
    name: "The EP",
    format: "12-inch",
    from: 6500,
    line: "Multi-day, multi-deliverable. The usual answer.",
    includes: [
      "Two to three shoot days",
      "Full crew (4–6)",
      "Pre-production & treatment",
      "Hero film + 8–12 social assets",
      "Stills coverage throughout",
      "Licensed music & sound design",
      "Three rounds of revisions",
      "Three-week delivery",
    ],
    best: "A campaign, a tour, a rebrand, a season of content.",
    featured: true,
  },
  {
    name: "The Album",
    format: "Boxed set",
    from: 15000,
    line: "A body of work. Booked as a retainer or a run.",
    includes: [
      "Four or more shoot days",
      "Full department heads",
      "Location scout & casting",
      "Complete campaign asset library",
      "Ongoing monthly content option",
      "Priority scheduling all year",
      "Unlimited revisions in scope",
      "Named producer on your account",
    ],
    best: "Labels, agencies, and brands who shoot every month.",
  },
];

/* ---------------------------------------------------------------------------
   PROCESS
   Answers the anxiety every first-time client actually has, which is not
   "what camera" but "what is going to happen to me".
   ------------------------------------------------------------------------- */

export const process = [
  {
    step: "01",
    title: "The call",
    duration: "30 minutes",
    body:
      "You tell us what the thing has to achieve. We tell you what it costs and whether we are the right studio for it — including when we are not. No deck, no discovery workshop, no invoice.",
  },
  {
    step: "02",
    title: "Treatment",
    duration: "3–5 days",
    body:
      "A written treatment with references, a shot approach, a schedule and a fixed quote. You are buying a plan before you buy a crew, so there is nothing to argue about on the day.",
  },
  {
    step: "03",
    title: "Shoot",
    duration: "1–4 days",
    body:
      "Crew, gear, permits and catering handled. You show up and do your job. We run a quiet set — the single most underrated feature of a production company.",
  },
  {
    step: "04",
    title: "Post",
    duration: "2–3 weeks",
    body:
      "Assembly, then a first cut for notes, then colour and sound. You get a review link where you can comment on the exact frame instead of writing 'around the middle bit'.",
  },
  {
    step: "05",
    title: "Delivery",
    duration: "Same week",
    body:
      "Every master, every aspect ratio, every caption file, in a folder that is still there in three years. The raw footage is archived and yours to ask for.",
  },
] as const;

/* ---------------------------------------------------------------------------
   FAQ — the questions that otherwise become the first email
   ------------------------------------------------------------------------- */

export const faqs = [
  {
    q: "What does a project actually cost?",
    a: "Most single-deliverable films land between $2,500 and $6,500. Campaigns with multiple shoot days and a full asset library run $6,500 to $15,000. Ongoing retainers start at $15,000. You will have a fixed quote in writing before anyone is booked — we do not send surprise invoices.",
  },
  {
    q: "How far ahead do I need to book?",
    a: "Three to four weeks is comfortable for a single shoot day. Campaigns want six to eight. That said, we hold space every month for fast-turn work — if you have a release date closing in, ask anyway.",
  },
  {
    q: "Do you travel outside Nashville?",
    a: "Constantly. Anywhere within a three-hour drive is billed as local. Beyond that we add travel at cost, with no markup, listed as its own line on the quote.",
  },
  {
    q: "Who owns the footage?",
    a: "You own the finished deliverables outright, in perpetuity, for any use. We keep the right to show the work in our portfolio — and if a project is under embargo or NDA, we simply do not. The raw footage is archived for three years and you can request it at any point.",
  },
  {
    q: "How fast is delivery?",
    a: "Two weeks for a single deliverable, three for a campaign. Event sizzles go out within the same week and social clips within 24 hours, because a highlight reel that arrives a month later is a document, not marketing.",
  },
  {
    q: "Can you work with our existing brand guidelines?",
    a: "Yes, and we would rather. Send the guidelines, the fonts and any previous work at the enquiry stage. If the guidelines and the goal are in conflict, we will flag it in the treatment rather than discover it in the edit.",
  },
  {
    q: "Do you shoot photo and video on the same day?",
    a: "Yes — it is usually the most efficient way to buy both. It does need to be planned in from the start, because stills and motion want different lighting and we schedule dedicated time for each rather than stealing frames between takes.",
  },
  {
    q: "What if we do not like the first cut?",
    a: "That is what the first cut is for. Every package includes revision rounds, and notes on the assembly are expected, not a problem. If the direction is genuinely wrong we re-cut it — that risk sits with us, which is exactly why we spend so long on the treatment.",
  },
] as const;

/* ---------------------------------------------------------------------------
   CLIENTS — logo strip
   Replace with real client names before launch.
   ------------------------------------------------------------------------- */

export const clients = [
  "Broadway Sound",
  "Ryman Collective",
  "East Nash Records",
  "Cumberland Coffee",
  "Third & Main",
  "Harlan Whiskey",
  "Belmont Studios",
  "The Basement East",
  "Silo Hospitality",
  "Nashville Design Week",
] as const;

export const testimonials = [
  {
    quote:
      "We had booked three crews before Amrow and every one of them made the same film. These are the only people who asked what the song was about before they asked what the budget was.",
    name: "Marcy Bell",
    role: "Artist manager, East Nash Records",
  },
  {
    quote:
      "The brand film paid for itself in eleven days. I do not have a more sophisticated way of putting it than that.",
    name: "Dev Chandra",
    role: "Founder, Cumberland Coffee",
  },
  {
    quote:
      "A quiet set with a nervous first-time artist is worth more than any camera on the truck. That is the thing I actually hire them for.",
    name: "Tom Rieger",
    role: "Label producer",
  },
] as const;
