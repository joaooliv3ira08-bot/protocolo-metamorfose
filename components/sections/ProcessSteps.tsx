import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { process } from "@/content/site";

export function ProcessSteps() {
  return (
    <section id="processo" className="border-y border-border bg-surface py-16 sm:py-24">
      <Container>
        <SectionTitle
          eyebrow="Como funciona"
          title="Do cálculo ao acesso ao seu plano"
          description="Um processo direto, do momento em que você escolhe o plano até a liberação do conteúdo."
        />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.step} className="rounded-lg border border-border bg-base p-6">
              <span className="font-mono-data text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink">{p.step}</h3>
              <p className="mt-2 text-sm text-ink-muted">{p.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
