import type { Grade } from "@/lib/work";
import { cn } from "@/lib/utils";

/* ============================================================================
   STILL — a procedurally generated film frame
   ----------------------------------------------------------------------------
   Every project needs an image before the studio has uploaded one. The usual
   answer is a grey box, which on a *photography* portfolio is worse than no
   site at all.

   So instead: a deterministic, seeded SVG that composes an out-of-focus frame
   from the same ingredients a real one has — a key light, a fill, a practical
   burning out somewhere in the background, a horizon, falloff, and grain. It
   reads as intentional bokeh rather than a missing asset, it weighs about a
   kilobyte, it renders on the server with zero client JS, and it looks
   different for every project without anyone art-directing it.

   When real stills arrive, pass `src` and this component steps aside entirely.
   ========================================================================== */

/** xorshift32 — same seed, same frame, forever. */
function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

type Palette = {
  /** Deepest shadow — the frame's black point. */
  base: string;
  /** The key light. */
  key: string;
  /** The fill, opposite the key on the colour wheel. */
  fill: string;
  /** A blown-out practical in the background. */
  practical: string;
  /** Overall lift — how far off true black the shadows sit. */
  lift: number;
};

const PALETTES: Record<Grade, Palette> = {
  // Warm interior. One tungsten source, everything else falls away.
  tungsten: {
    base: "#160c05",
    key: "#ff9743",
    fill: "#b8501a",
    practical: "#ffe2bc",
    lift: 0.1,
  },
  // The classic teal/orange grade: warm skin, cold everything else.
  teal: {
    base: "#04171a",
    key: "#ffa163",
    fill: "#1f8f88",
    practical: "#a8f0e4",
    lift: 0.09,
  },
  // Bleach bypass: silver, contrasty, colour drained out of the mids.
  bleach: {
    base: "#191713",
    key: "#f2ede1",
    fill: "#9a9184",
    practical: "#ffffff",
    lift: 0.16,
  },
  // Day-for-night. Deep blue, with one warm thing to prove it is not grey.
  night: {
    base: "#050d1d",
    key: "#5b93d4",
    fill: "#16305c",
    practical: "#ffc48a",
    lift: 0.07,
  },
};

export function Still({
  seed,
  grade = "tungsten",
  className,
  /** Real image URL. When present the procedural frame is not rendered. */
  src,
  alt = "",
  /** Adds the black bars of a 2.39:1 anamorphic crop. */
  letterbox = false,
  priority = false,
}: {
  seed: number;
  grade?: Grade;
  className?: string;
  src?: string;
  alt?: string;
  letterbox?: boolean;
  priority?: boolean;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  const p = PALETTES[grade];
  const rand = rng(seed);

  // Three light sources placed in the frame. The key is biased toward the
  // rule-of-thirds lines because that is where a real one usually is.
  const lights = [
    {
      x: 22 + rand() * 24,
      y: 26 + rand() * 22,
      r: 38 + rand() * 22,
      color: p.key,
      opacity: 1,
    },
    {
      x: 58 + rand() * 30,
      y: 48 + rand() * 34,
      r: 30 + rand() * 26,
      color: p.fill,
      opacity: 0.92,
    },
    {
      x: 10 + rand() * 80,
      y: 8 + rand() * 26,
      r: 8 + rand() * 10,
      color: p.practical,
      opacity: 0.8,
    },
  ];

  // Out-of-focus foreground bokeh. Small count, large radius — that is what
  // a fast lens wide open actually does to a background highlight.
  const bokeh = Array.from({ length: 7 }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: 1.6 + rand() * 5.5,
    o: 0.05 + rand() * 0.16,
  }));

  // The horizon sits off-centre; a centred one reads as a chart, not a frame.
  const horizon = 54 + rand() * 22;
  const uid = `s${seed}${grade}`;

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      aria-hidden={!alt || undefined}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {lights.map((l, i) => (
            <radialGradient key={i} id={`${uid}-l${i}`}>
              <stop offset="0%" stopColor={l.color} stopOpacity={l.opacity} />
              <stop offset="45%" stopColor={l.color} stopOpacity={l.opacity * 0.35} />
              <stop offset="100%" stopColor={l.color} stopOpacity="0" />
            </radialGradient>
          ))}

          {/* Depth: the floor is always fractionally brighter than the ceiling. */}
          <linearGradient id={`${uid}-depth`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.base} stopOpacity="0.62" />
            <stop offset={`${horizon}%`} stopColor={p.base} stopOpacity="0.04" />
            <stop offset="100%" stopColor={p.base} stopOpacity="0.7" />
          </linearGradient>

          <radialGradient id={`${uid}-vig`}>
            <stop offset="58%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
          </radialGradient>

          {/* Everything gets softened — this is a frame shot wide open. */}
          <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
        </defs>

        <rect width="100" height="100" fill={p.base} />

        <g filter={`url(#${uid}-soft)`}>
          {lights.map((l, i) => (
            <circle key={i} cx={l.x} cy={l.y} r={l.r} fill={`url(#${uid}-l${i})`} />
          ))}
        </g>

        <rect width="100" height="100" fill={`url(#${uid}-depth)`} />

        {/* Bokeh discs sit above the depth pass so they read as foreground. */}
        <g>
          {bokeh.map((b, i) => (
            <circle
              key={i}
              cx={b.x}
              cy={b.y}
              r={b.r}
              fill={p.practical}
              opacity={b.o}
            />
          ))}
        </g>

        {/* A single hard edge somewhere — a doorway, a stand, a shoulder. It is
            what stops the frame reading as pure abstract gradient noise. */}
        <rect
          x={rand() * 70}
          y={horizon - 2}
          width={6 + rand() * 16}
          height={100 - horizon + 4}
          fill={p.base}
          opacity={0.55 + rand() * 0.3}
        />

        <rect width="100" height="100" fill={`url(#${uid}-vig)`} />
      </svg>

      {/* Grain, scoped to the frame rather than the page. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
        }}
      />

      {letterbox && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[11%] bg-negative" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[11%] bg-negative" />
        </>
      )}
    </div>
  );
}
