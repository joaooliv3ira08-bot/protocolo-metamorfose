import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getAllPlans, getPlanBySlug } from "@/lib/plans-data";
import { formatBRL } from "@/lib/format";
import { contact } from "@/content/site";

export function generateStaticParams() {
  return getAllPlans().map((plan) => ({ slug: plan.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const plan = getPlanBySlug(params.slug);
  if (!plan) return {};
  return {
    title: plan.name,
    description: plan.shortDescription,
  };
}

export default function PlanDetailPage({ params }: { params: { slug: string } }) {
  const plan = getPlanBySlug(params.slug);
  if (!plan) notFound();

  return (
    <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
      <div>
        {plan.featured ? <Badge>Mais escolhido</Badge> : <Badge tone="muted">{plan.name}</Badge>}
        <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">{plan.name}</h1>
        <p className="mt-4 max-w-prose text-ink-muted">{plan.description}</p>

        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold text-ink">Benefícios</h2>
          <ul className="mt-3 space-y-2">
            {plan.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-ink-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold text-ink">O que está incluso</h2>
          <ul className="mt-3 space-y-2">
            {plan.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="h-fit rounded-lg border border-border bg-surface p-6">
        <p className="font-mono-data text-3xl font-bold text-ink">
          {formatBRL(plan.price)}
        </p>
        {plan.isProvisionalPrice ? (
          <p className="mt-1 text-xs text-warning">Valor de exemplo — substitua pelo preço real antes de publicar.</p>
        ) : null}
        <p className="mt-4 text-sm text-ink-muted">Pagamento único via Pix. Acesso liberado imediatamente após a confirmação.</p>
        <LinkButton href={`/checkout/${plan.slug}`} size="lg" className="mt-6 w-full">
          Comprar com Pix
        </LinkButton>

        {contact.whatsapp ? (
          <a
            href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
              `Olá! Quero comprar o ${plan.name} (${formatBRL(plan.price)}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-success/40 bg-success/10 px-5 py-3.5 text-sm font-semibold text-success transition-colors hover:bg-success/20"
          >
            Comprar pelo WhatsApp
          </a>
        ) : null}

        <p className="mt-3 text-center text-xs text-ink-muted">Ambiente seguro. Nenhum dado de pagamento é armazenado no site.</p>
      </aside>
    </Container>
  );
}
