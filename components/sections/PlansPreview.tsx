import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PlanCard } from "@/components/sections/PlanCard";
import { plans } from "@/content/site";

export function PlansPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionTitle
          eyebrow="Planos"
          title="Escolha treino, alimentação ou o protocolo combinado"
          align="center"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  );
}
