import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { heroContent } from "@/content/site";
import { ProtocolReadout } from "./ProtocolReadout";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-scan-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="animate-fade-up">
          <p className="font-mono-data text-xs uppercase tracking-[0.25em] text-primary">
            {heroContent.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {heroContent.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted">{heroContent.subheadline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LinkButton href={heroContent.primaryCta.href} size="lg">
              {heroContent.primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkButton>
            <Link
              href={heroContent.secondaryCta.href}
              className="focus-ring rounded-md text-sm font-semibold text-ink-muted underline decoration-border underline-offset-4 hover:text-ink"
            >
              {heroContent.secondaryCta.label}
            </Link>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            {heroContent.metrics.map((m) => (
              <div key={m.label}>
                <dt className="text-xs text-ink-muted">{m.label}</dt>
                <dd className="font-mono-data mt-1 text-base font-semibold text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ProtocolReadout />
      </Container>
    </section>
  );
}
