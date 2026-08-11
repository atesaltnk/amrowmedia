import { Still } from "@/components/motion/still";
import { Button } from "@/components/ui/button";

/**
 * 404 — wayfinding, not a joke.
 * Says where they are, and offers the two places they were most likely
 * heading. Never a dead end.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[86svh] items-center justify-center overflow-hidden px-gutter">
      <div className="absolute inset-0">
        <Still seed={999} grade="night" />
        <div className="absolute inset-0 bg-negative/78" />
      </div>

      <div className="relative z-10 max-w-xl text-center">
        <span className="t-slate text-tungsten">Error 404 — no such frame</span>
        <h1 className="t-h1 mt-6 text-balance">
          That shot is not in the reel.
        </h1>
        <p className="t-lead mt-6 text-pretty">
          The page you were after has moved or never existed. The work is still
          where you left it.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/work" variant="primary">
            See the work
          </Button>
          <Button href="/" variant="ghost" icon={false}>
            Back to the start
          </Button>
        </div>
      </div>
    </section>
  );
}
