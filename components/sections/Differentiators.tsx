import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { differentiators } from "@/content/site";

export function Differentiators() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionTitle
          eyebrow="Por que o método é diferente"
          title="Planos que partem dos seus números, não de um modelo pronto"
          description="Cada diferencial abaixo existe para resolver um problema comum de planos genéricos: a falta de individualização real."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {differentiators.map((d) => (
            <Card key={d.title}>
              <h3 className="font-display text-lg font-semibold text-ink">{d.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{d.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
