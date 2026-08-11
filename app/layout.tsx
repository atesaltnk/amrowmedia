import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/chrome/header";
import { Footer } from "@/components/chrome/footer";
import { Grain } from "@/components/chrome/grain";
import { Reticle } from "@/components/chrome/reticle";
import { Hud } from "@/components/chrome/hud";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  /* ⚠️ Once `site.contact.city` is set, prefix the first four of these with it
     ("<city> event photographer", …). Location-qualified terms are how this
     work is actually searched for, and right now the site cannot compete on
     them at all because it never says where it is. */
  keywords: [
    "event photographer",
    "event videographer",
    "concert photographer",
    "live music photographer",
    "small business branding photography",
    "product photography",
    "expo and convention photographer",
    "content day photographer",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.domain,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#060607",
  colorScheme: "dark",
};

/**
 * Structured data.
 *
 * This is the highest-leverage block on the whole site. Buyers search
 * "event photographer near me" — without this, the business is invisible to
 * the map pack and to every AI answer engine no matter how good the work is.
 *
 * ⚠️ It degrades honestly: with no location set in lib/site.ts it publishes as
 * a plain Organization rather than a LocalBusiness, because a LocalBusiness
 * with an empty address is worse than none — it is an invalid entity that
 * search engines will discard and that can suppress the whole block. Fill in
 * `site.contact.city` and it upgrades itself automatically.
 */
function StructuredData() {
  const hasLocation = Boolean(site.contact.city && site.contact.region);
  const hasGeo = site.contact.geo.lat !== 0 || site.contact.geo.lng !== 0;

  const json = {
    "@context": "https://schema.org",
    "@type": hasLocation
      ? ["LocalBusiness", "ProfessionalService"]
      : "Organization",
    "@id": `${site.domain}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.domain,
    email: site.contact.email,
    founder: { "@type": "Person", name: site.owner },
    image: `${site.domain}/opengraph-image`,
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(hasLocation
      ? {
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: site.contact.city,
            addressRegion: site.contact.region,
            ...(site.contact.postalCode
              ? { postalCode: site.contact.postalCode }
              : {}),
            addressCountry: site.contact.country,
          },
        }
      : {}),
    ...(hasGeo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: site.contact.geo.lat,
            longitude: site.contact.geo.lng,
          },
        }
      : {}),
    ...(site.serviceArea.length
      ? {
          areaServed: site.serviceArea.map((a) => ({ "@type": "City", name: a })),
        }
      : {}),
    sameAs: site.social.map((s) => s.href),
    knowsAbout: [
      "Event photography",
      "Concert and live music photography",
      "Brand and product photography",
      "Videography",
      "Portrait photography",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Content is a literal object defined above — no user input reaches it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="cursor-hidden antialiased">
        {/* Keyboard users get out of the chrome in one press. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-tungsten focus:px-5 focus:py-3 focus:text-negative"
        >
          Skip to content
        </a>

        <Grain />
        <Reticle />
        <Hud />
        <Header />

        <main id="main">{children}</main>

        <Footer />
        <StructuredData />
      </body>
    </html>
  );
}
