import Link from "next/link";
import { Check } from "lucide-react";
import { Plan } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { formatBRL } from "@/lib/format";

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`flex h-full flex-col rounded-lg border p-6 ${
        plan.featured ? "border-primary bg-surface shadow-glow" : "border-border bg-surface"
      }`}
    >
      {plan.featured ? (
        <Badge>Mais escolhido</Badge>
      ) : (
        <Badge tone="muted">{plan.type === "treino" ? "Treino" : "Alimentação"}</Badge>
      )}

      <h3 className="mt-4 font-display text-xl font-semibold text-ink">{plan.name}</h3>
      <p className="mt-2 text-sm text-ink-muted">{plan.shortDescription}</p>

      <ul className="mt-5 space-y-2">
        {plan.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-ink-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex-1" />

      <div className="mt-6 border-t border-border pt-5">
        <p className="font-mono-data text-2xl font-bold text-ink">
          {formatBRL(plan.price)}
          {plan.isProvisionalPrice && (
            <span className="ml-2 align-middle text-xs font-normal text-ink-muted">(valor de exemplo)</span>
          )}
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <LinkButton href={`/planos/${plan.slug}`} className="flex-1" variant={plan.featured ? "primary" : "secondary"}>
            Ver detalhes
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
