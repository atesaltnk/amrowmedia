import { Hero } from "@/components/sections/hero";
import { Clients } from "@/components/sections/clients";
import { ReelStrip } from "@/components/sections/reel-strip";
import { Manifesto } from "@/components/sections/manifesto";
import { ServicesList } from "@/components/sections/services-list";
import { ProcessStack } from "@/components/sections/process-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { Cta } from "@/components/sections/cta";

/**
 * HOME
 *
 * The order is an argument, not a layout:
 *   Hero        — who we are, in one line
 *   Clients     — and people already believe it
 *   Work        — here is the evidence
 *   Manifesto   — here is why it works
 *   Services    — here is what you can buy
 *   Process     — here is what happens to you
 *   Testimonials— here is someone who is not us saying so
 *   CTA         — so here is the next step
 *
 * Note the alternation: dark, dark, dark, then the testimonials flip to the
 * warm print grade before the final dark CTA. That single inversion resets the
 * eye two thirds of the way down and stops the page reading as one long tunnel.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <ReelStrip />
      <Manifesto />
      <ServicesList />
      <ProcessStack />
      <Testimonials />
      <Cta />
    </>
  );
}
