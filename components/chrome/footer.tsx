import Link from "next/link";
import { site, nav, services } from "@/lib/site";
import { Marquee } from "@/components/motion/marquee";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-negative-edge bg-negative">
      {/* The one place the studio name is allowed to be enormous. */}
      <div className="overflow-hidden border-b border-negative-edge py-6">
        <Marquee duration={38}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="t-display mx-8 whitespace-nowrap text-negative-edge"
              aria-hidden={i > 0}
            >
              AMROW MEDIA <span className="text-tungsten">·</span>{" "}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="px-gutter py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="t-h3 max-w-sm text-balance text-ink">
              {site.promise}
            </p>
            <div className="mt-8 flex flex-col gap-1.5">
              <a
                href={`mailto:${site.contact.email}`}
                className="text-ink-2 transition-colors hover:text-tungsten"
              >
                {site.contact.email}
              </a>
              <a
                href={site.contact.phoneHref}
                className="text-ink-2 transition-colors hover:text-tungsten"
              >
                {site.contact.phone}
              </a>
            </div>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <h2 className="t-slate mb-5">Pages</h2>
            <ul className="flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-2 transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="t-slate mb-5">Services</h2>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-ink-2 transition-colors hover:text-ink"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="t-slate mb-5">Elsewhere</h2>
            <ul className="flex flex-col gap-2.5">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-2 transition-colors hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule mt-14" />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-slate">
            © {year} {site.legalName} · {site.contact.city}, {site.contact.region}
          </p>
          <p className="t-slate">
            Serving {site.serviceArea.slice(0, 4).join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
