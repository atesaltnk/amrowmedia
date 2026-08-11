/* ============================================================================
   THE WORK
   ----------------------------------------------------------------------------
   The biggest weakness of the current site is that the portfolio is a masonry
   wall of images with no context. The photographs are good — a wrestler
   mid-throw, two Rottweilers in a packed hall, a band under stage haze — but
   an image on its own only proves you can operate a camera. Brief → constraint
   → what I did → what they got is what proves you can be trusted with a
   budget, and that is a different purchase decision.

   These six are reconstructed from work visible in the live portfolio.

   ⚠️  IMPORTANT — READ BEFORE LAUNCH
   The `results` blocks below deliberately contain ONLY production facts:
   what was shot, how long it took, what was delivered. They contain no
   invented client business metrics — no revenue lifts, no engagement numbers,
   no "sales doubled". Publishing fabricated performance figures next to a real
   named client is a genuine liability, not just an inaccuracy.

   Replace the narrative text with what actually happened. If a client will
   confirm a real business outcome in writing, that is worth more than any of
   this — put it in and mark it as theirs.
   ========================================================================== */

export type Grade = "tungsten" | "teal" | "bleach" | "night";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: number;
  line: string;
  brief: string;
  constraint: string;
  approach: string;
  outcome: string;
  /** Production facts only — never invented client business metrics. */
  results: { value: string; label: string }[];
  deliverables: string[];
  credits: { role: string; name: string }[];
  runtime: string;
  grade: Grade;
  seed: number;
  featured?: boolean;
};

const ALEX = "Alex — AMRow Media";

export const projects: Project[] = [
  {
    slug: "renegade-pets-expo",
    title: "Fierce, In The Wild",
    client: "Renegade Pets",
    category: "Events",
    year: 2025,
    line: "A dog treat brand, a packed expo floor, and weather that would not commit.",
    brief:
      "Renegade Pets needed their booth and their product to look like a real brand in a hall full of competitors — not like a table with bags on it.",
    constraint:
      "Hot, humid, raining on and off, and packed with people, food and drinks. Nothing could be staged and nothing could be moved. Every frame had to be found in the middle of a working event.",
    approach:
      "I worked the floor rather than the booth. Product shots were taken in real hands at real moments — a gift card held up mid-conversation, packaging behind a dog that had stopped to say hello — so the brand appears inside the day instead of being cut out of it. When the light turned flat I shot tighter and let the packaging carry the colour.",
    outcome:
      "A full gallery of event and product coverage the brand could use for retail, social and their own site, all from a single day on a floor that never stopped moving.",
    results: [
      { value: "1 day", label: "Single-day coverage" },
      { value: "Photo + video", label: "Both, same day" },
      { value: "24h", label: "First clips delivered" },
    ],
    deliverables: [
      "Full event gallery",
      "Product & packaging frames",
      "Vertical clips for social",
      "Booth and crowd coverage",
    ],
    credits: [
      { role: "Photography", name: ALEX },
      { role: "Video", name: ALEX },
      { role: "Edit & grade", name: ALEX },
    ],
    runtime: "PT0M45S",
    grade: "teal",
    seed: 11,
    featured: true,
  },
  {
    slug: "smack-product",
    title: "Raw, Outdoors",
    client: "Smack Pet Food",
    category: "Branding & Product",
    year: 2025,
    line: "Packaging shot where the product is actually meant to make sense.",
    brief:
      "A raw dehydrated pet food brand needed product photography that did not look like every other bag photographed on a white sweep.",
    constraint:
      "Two SKUs, bright saturated packaging, and a live dog. The packaging colour had to stay accurate for retail while sitting in dappled outdoor light that changes every ninety seconds.",
    approach:
      "I shot on location with the dog in frame and the bags placed low, at the animal's level, so the product reads as part of a walk rather than a studio setup. Exposing for the packaging and letting the background fall away kept the brand colours true while the environment stayed soft and warm behind them.",
    outcome:
      "A set of product frames that work for retail listings, social and paid, all with a consistent look, from one outdoor session.",
    results: [
      { value: "2 SKUs", label: "Covered in one session" },
      { value: "On location", label: "No studio hire" },
      { value: "Multi-crop", label: "Retail, social, paid" },
    ],
    deliverables: [
      "Product hero frames",
      "Lifestyle and in-use shots",
      "Retail-accurate colour",
      "9:16, 4:5 and 1:1 crops",
    ],
    credits: [
      { role: "Photography", name: ALEX },
      { role: "Retouch", name: ALEX },
    ],
    runtime: "PT0M00S",
    grade: "tungsten",
    seed: 27,
    featured: true,
  },
  {
    slug: "tomorrows-problem-live",
    title: "Tomorrow's Problem",
    client: "Tomorrow's Problem",
    category: "Concerts",
    year: 2025,
    line: "A set shot for the darkness rather than against it.",
    brief:
      "The band needed live photographs and press stills they could actually release — not phone footage and not a flash-lit blowout.",
    constraint:
      "House lighting only, no additional sources permitted, and no positions on stage. Whatever the venue was doing with colour was what I had to work with.",
    approach:
      "I shot wide open and let the venue's own lighting state be the look, working the haze and the backlight instead of trying to correct them. A separate black and white pass gave the band a second, harder-edged set from the same night — same performance, completely different feel, no extra shoot.",
    outcome:
      "Colour and monochrome sets from a single show, plus vertical cuts the band could post before the gear was packed.",
    results: [
      { value: "1 show", label: "Two complete sets" },
      { value: "House light", label: "No added lighting" },
      { value: "Same night", label: "First cuts posted" },
    ],
    deliverables: [
      "Full set photography",
      "Black and white press set",
      "Vertical performance clips",
      "Stage and crowd coverage",
    ],
    credits: [
      { role: "Photography", name: ALEX },
      { role: "Video", name: ALEX },
    ],
    runtime: "PT1M00S",
    grade: "night",
    seed: 43,
    featured: true,
  },
  {
    slug: "pet-expo-floor",
    title: "The Floor",
    client: "⚠️ Client name",
    category: "Events",
    year: 2025,
    line: "Thousands of people, hundreds of dogs, one operator.",
    brief:
      "Convention-scale event coverage: exhibitors, attendees, competitions and the general feeling of a hall that is completely full.",
    constraint:
      "A single operator covering a venue that would normally take a team, under mixed and unflattering overhead lighting, with subjects — many of them animals — who do not take direction.",
    approach:
      "I planned the day as a route rather than a shot list, sweeping the floor on a loop so no area went uncovered and returning to the busiest zones at their peak. With dogs the rule is to get low and wait; nearly every usable frame came from being at the animal's height and staying there longer than felt comfortable.",
    outcome:
      "A gallery covering exhibitors, competitions and attendees that both the organiser and the individual stallholders could use.",
    results: [
      { value: "Full venue", label: "Single operator" },
      { value: "Same week", label: "Gallery delivered" },
      { value: "24h", label: "Social clips live" },
    ],
    deliverables: [
      "Full event gallery",
      "Exhibitor and booth coverage",
      "Competition and ring coverage",
      "Social clips within 24 hours",
    ],
    credits: [{ role: "Photography & video", name: ALEX }],
    runtime: "PT1M15S",
    grade: "bleach",
    seed: 58,
  },
  {
    slug: "ring-night",
    title: "Ring Night",
    client: "⚠️ Client name",
    category: "Events",
    year: 2025,
    line: "Live wrestling, shot from the floor, in one take each.",
    brief:
      "Coverage of a live wrestling card staged inside a larger event — action frames the promotion and the performers could both use.",
    constraint:
      "Unrepeatable action, a crowd on every side of the ring, and convention hall lighting that flattens everything it touches.",
    approach:
      "Shooting from low at the ring apron puts the performers against the ceiling rather than against the crowd, which separates them from a background that would otherwise swallow them. Fast shutter and continuous tracking through the whole sequence — the frame that works is usually a fifth of a second either side of the one you would have predicted.",
    outcome:
      "Peak-action stills for the promotion and individual performers, plus clips cut for the promotion's social channels.",
    results: [
      { value: "Live", label: "No second takes" },
      { value: "Per performer", label: "Individual sets" },
      { value: "Same week", label: "Full delivery" },
    ],
    deliverables: [
      "Peak-action photography",
      "Per-performer image sets",
      "Vertical clips",
      "Crowd and atmosphere frames",
    ],
    credits: [{ role: "Photography & video", name: ALEX }],
    runtime: "PT0M50S",
    grade: "night",
    seed: 71,
  },
  {
    slug: "table-and-hands",
    title: "Table & Hands",
    client: "⚠️ Client name",
    category: "Branding & Product",
    year: 2025,
    line: "Food and craft work, shot close enough to feel.",
    brief:
      "A set of images for hospitality and maker clients — grazing boards, prepared food, and documentary coverage of people working with their hands.",
    constraint:
      "Food has a very short window before it stops looking like food, and craft work cannot be paused for the camera without the results looking posed.",
    approach:
      "Everything shot tight and from above or just off it, so the frame is filled by texture rather than by table. For the maker work I switched to black and white and stopped directing entirely — hands, tools and concentration, photographed at working distance while the work carried on.",
    outcome:
      "A library of close, tactile frames that hospitality and maker clients can use across menus, social and their own sites.",
    results: [
      { value: "Batch", label: "Multiple setups per day" },
      { value: "Colour + B&W", label: "Two treatments" },
      { value: "48h", label: "Selects returned" },
    ],
    deliverables: [
      "Food and product frames",
      "Documentary maker coverage",
      "Black and white set",
      "Web and print resolutions",
    ],
    credits: [{ role: "Photography", name: ALEX }],
    runtime: "PT0M00S",
    grade: "bleach",
    seed: 89,
  },
];

export const categories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
] as const;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeatured() {
  return projects.filter((p) => p.featured);
}

/** Adjacent project, for the "next case study" link at the foot of a study. */
export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
}
