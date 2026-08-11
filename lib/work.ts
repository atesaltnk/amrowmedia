/* ============================================================================
   THE WORK
   ----------------------------------------------------------------------------
   Each project is a case study, not a thumbnail. A production portfolio that
   shows only pretty frames tells a prospective client that you can operate a
   camera. Showing the brief, the constraint and the result tells them you can
   be trusted with a budget — which is the actual purchase decision.

   ⚠️  These are structured placeholders with realistic shape. Replace `poster`
       and `frames` with real stills, and `reel` with the real Vimeo/YouTube or
       self-hosted MP4, before launch. See README → "Dropping in real assets".
   ========================================================================== */

export type Grade = "tungsten" | "teal" | "bleach" | "night";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: number;
  /** Short line for the index grid. */
  line: string;
  /** The commercial problem. */
  brief: string;
  /** What made it hard. Clients recognise their own constraints here. */
  constraint: string;
  /** The creative answer. */
  approach: string;
  /** Outcome. Numbers where they are real, plain language where they are not. */
  outcome: string;
  /** Metrics shown as a row of stat blocks on the case study. */
  results: { value: string; label: string }[];
  deliverables: string[];
  credits: { role: string; name: string }[];
  /** Runtime of the hero deliverable, for VideoObject structured data. */
  runtime: string;
  /** Colour grade — drives the generated still. */
  grade: Grade;
  /** Deterministic seed for the procedural still. Change it to reshuffle. */
  seed: number;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "half-light-sessions",
    title: "Half Light Sessions",
    client: "East Nash Records",
    category: "Live Session",
    year: 2026,
    line: "Four songs, one room, no second takes.",
    brief:
      "A label with six new signings and no budget to shoot six music videos. They needed a format — something repeatable that made a new artist look established from the first frame.",
    constraint:
      "One evening per artist, in a working studio that could not be re-rigged between sessions. Every artist had to look distinct inside an identical space.",
    approach:
      "We built the whole format around a single practical: one tungsten source that moves. Its position changes the room completely between artists without touching the grid, so each session reads as its own world while the schedule stays brutal and cheap. Four cameras, all locked, no coverage safety net — which forced the performances to carry it.",
    outcome:
      "The format ran for six artists across three weeks. Two of the sessions out-performed the label's paid music video spend for the same quarter, on roughly a tenth of the budget.",
    results: [
      { value: "6", label: "Artists, one format" },
      { value: "1.4M", label: "Combined views, first 90 days" },
      { value: "−89%", label: "Cost per artist vs. prior video spend" },
    ],
    deliverables: [
      "4 × session films per artist",
      "24 vertical performance cuts",
      "Press stills per session",
      "Format bible for future shoots",
    ],
    credits: [
      { role: "Director", name: "Amrow Media" },
      { role: "DP", name: "Amrow Media" },
      { role: "Sound", name: "Broadway Sound" },
      { role: "Colour", name: "Amrow Media" },
    ],
    runtime: "PT3M42S",
    grade: "tungsten",
    seed: 11,
    featured: true,
  },
  {
    slug: "cumberland-origin",
    title: "Origin",
    client: "Cumberland Coffee",
    category: "Brand Film",
    year: 2026,
    line: "A founder story with no founder on camera.",
    brief:
      "A roastery opening its third location needed a film for the raise. The founder is a genuinely brilliant operator and a genuinely uncomfortable on-camera presence.",
    constraint:
      "The obvious film — founder to camera, warm lighting, acoustic guitar — would have been actively worse than no film at all. And the pitch deadline was nineteen days out.",
    approach:
      "We cut the founder out of frame entirely and put her only in voiceover, recorded as a conversation rather than a read. On screen: hands, machines, the 4am load-in, the specific violence of a roast. The film argues that the business is a craft operation by showing craft, and never once says the word.",
    outcome:
      "Used as the opening asset in the raise. The round closed. It is now the film they show every new hire on day one, which was not what it was commissioned for and is probably the better outcome.",
    results: [
      { value: "19 days", label: "Brief to final delivery" },
      { value: "Closed", label: "Funding round it opened" },
      { value: "0", label: "Seconds of founder on camera" },
    ],
    deliverables: [
      "Hero film (2:10)",
      "60s / 30s / 15s cutdowns",
      "Vertical master",
      "42 retouched stills",
    ],
    credits: [
      { role: "Director", name: "Amrow Media" },
      { role: "Producer", name: "Amrow Media" },
      { role: "Sound design", name: "Broadway Sound" },
    ],
    runtime: "PT2M10S",
    grade: "teal",
    seed: 27,
    featured: true,
  },
  {
    slug: "harlan-batch-no-4",
    title: "Batch No. 4",
    client: "Harlan Whiskey",
    category: "Commercial",
    year: 2025,
    line: "One shoot day. Thirty-one assets. A quarter of paid media.",
    brief:
      "A small distillery competing for feed attention against national spirits budgets. They needed volume without the work looking like volume.",
    constraint:
      "A single day in the rickhouse, no talent budget, and a legal review process that touches every frame containing liquid.",
    approach:
      "We designed the day as a production line rather than a shoot: a fixed lighting state, a locked macro rig, and a run of forty product beats shot back to back — then a second pass with the same setups at a different exposure to double the usable grades. The variety in the final assets is entirely built in the edit, which is where variety is cheap.",
    outcome:
      "Thirty-one finished assets from one day. Their cost per thousand impressions fell by just over a third against the previous quarter's creative.",
    results: [
      { value: "31", label: "Finished assets, one day" },
      { value: "−34%", label: "Cost per thousand impressions" },
      { value: "3 mo", label: "Paid media covered" },
    ],
    deliverables: [
      "31 social assets",
      "6 hook variants for testing",
      "9:16, 4:5, 1:1 masters",
      "18 static frames for paid",
    ],
    credits: [
      { role: "Director", name: "Amrow Media" },
      { role: "Food & liquid", name: "Third & Main" },
      { role: "Colour", name: "Amrow Media" },
    ],
    runtime: "PT0M30S",
    grade: "bleach",
    seed: 43,
    featured: true,
  },
  {
    slug: "the-basement-east-live",
    title: "Room of 400",
    client: "The Basement East",
    category: "Live & Events",
    year: 2025,
    line: "A sold-out night, delivered before the crowd got home.",
    brief:
      "A venue that sells out on reputation wanted to sell out on evidence. They needed the room to look, online, the way it feels at 11pm.",
    constraint:
      "No additional lighting permitted, no positions on the floor, and the sizzle had to be live before the audience finished posting their own phone footage.",
    approach:
      "Four operators working entirely with the house lighting state, shooting for the darkness rather than fighting it. We cut on site between sets, so the first clip was public forty minutes after the encore and the full sizzle went out the same night.",
    outcome:
      "The venue's next three shows sold out in advance for the first time in two years. The format now runs monthly.",
    results: [
      { value: "40 min", label: "Encore to first clip live" },
      { value: "3", label: "Consecutive advance sell-outs after" },
      { value: "Monthly", label: "Format now runs" },
    ],
    deliverables: [
      "Same-night sizzle (75s)",
      "Full multi-cam set recording",
      "12 social clips within 24h",
      "Gallery of 60 stills",
    ],
    credits: [
      { role: "Director", name: "Amrow Media" },
      { role: "Camera", name: "Amrow Media ×4" },
      { role: "Live sound", name: "Broadway Sound" },
    ],
    runtime: "PT1M15S",
    grade: "night",
    seed: 58,
  },
  {
    slug: "silo-portraits",
    title: "The Silo Portraits",
    client: "Silo Hospitality",
    category: "Photography",
    year: 2025,
    line: "Ninety staff portraits that do not look like staff portraits.",
    brief:
      "A hospitality group rebranding around its people needed portraits of ninety employees across four venues, for web, print and recruitment.",
    constraint:
      "Six minutes per person, shot inside operating venues during service, with most subjects having never been photographed professionally and actively dreading it.",
    approach:
      "A single portable lighting state rebuilt in each venue so the set is identical and the backgrounds are not. Then we stopped photographing people and started talking to them — every usable frame in the final set was taken while the subject was mid-sentence about something other than the photograph.",
    outcome:
      "Ninety portraits in four days. The group's application rate for open roles roughly doubled over the following quarter.",
    results: [
      { value: "90", label: "Portraits in 4 days" },
      { value: "6 min", label: "Per subject, during service" },
      { value: "≈2×", label: "Job application rate after" },
    ],
    deliverables: [
      "90 retouched portraits",
      "Full contact sheets",
      "Web & print resolutions",
      "Recruitment usage licence",
    ],
    credits: [
      { role: "Photographer", name: "Amrow Media" },
      { role: "Retouch", name: "Amrow Media" },
    ],
    runtime: "PT0M00S",
    grade: "bleach",
    seed: 71,
  },
  {
    slug: "ryman-collective-tour",
    title: "Nine Cities",
    client: "Ryman Collective",
    category: "Music & Artist",
    year: 2025,
    line: "A tour documentary shot by two people in a van.",
    brief:
      "Nine dates, no tour videographer budget, and a label that wanted a documentary at the end of it rather than a folder of phone clips.",
    constraint:
      "Two crew, total. Every frame had to be shot by people who were also driving, loading in, and sleeping in the van.",
    approach:
      "We built a kit that one person could carry in a single trip and shoot without a second op — one body, two primes, a recorder on the artist all day. The rule was that the camera never got set up: if a moment needed rigging, it was not the moment. The documentary is entirely made of things that happened whether we were there or not.",
    outcome:
      "A 24-minute documentary and a year of social assets from a production cost lower than a single conventional shoot day.",
    results: [
      { value: "24 min", label: "Finished documentary" },
      { value: "9", label: "Cities, 2 crew" },
      { value: "1 yr", label: "Social assets banked" },
    ],
    deliverables: [
      "Documentary (24 min)",
      "Trailer (90s)",
      "40+ social clips",
      "Tour photography archive",
    ],
    credits: [
      { role: "Director", name: "Amrow Media" },
      { role: "Camera & sound", name: "Amrow Media ×2" },
      { role: "Edit", name: "Amrow Media" },
    ],
    runtime: "PT24M00S",
    grade: "night",
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
