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
  keywords: [
    "Nashville videographer",
    "Nashville video production",
    "Nashville photographer",
    "music video production Nashville",
    "brand film Nashville",
    "commercial video production Tennessee",
    "live session filming",
    "event videographer Nashville",
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
 * LocalBusiness structured data.
 *
 * This is the highest-leverage twenty lines on the whole site. A production
 * studio's buyers search "videographer near me" — without this, the business
 * is invisible to the map pack and to every AI answer engine, no matter how
 * good the films are.
 */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${site.domain}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.domain,
    email: site.contact.email,
    telephone: site.contact.phone,
    priceRange: "$$$",
    image: `${site.domain}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.contact.city,
      addressRegion: site.contact.region,
      postalCode: site.contact.postalCode,
      addressCountry: site.contact.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.contact.geo.lat,
      longitude: site.contact.geo.lng,
    },
    areaServed: site.serviceArea
      .filter((a) => a !== "Anywhere the job is")
      .map((a) => ({ "@type": "City", name: a })),
    sameAs: site.social.map((s) => s.href),
    knowsAbout: [
      "Video production",
      "Music video direction",
      "Commercial photography",
      "Live event filming",
      "Colour grading",
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
