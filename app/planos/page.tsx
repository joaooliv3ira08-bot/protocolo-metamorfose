import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PlanCard } from "@/components/sections/PlanCard";
import { HealthCalculatorWidget } from "@/components/sections/HealthCalculatorWidget";
import { Faq } from "@/components/sections/Faq";
import { plans } from "@/content/site";

export const metadata: Metadata = {
  title: "Planos",
  description: "Planos de treino, alimentação e combinado, com acesso liberado após pagamento via Pix.",
};

export default function PlanosPage() {
  return (
    <>
      <Container className="py-16 sm:py-20">
        <SectionTitle
          eyebrow="Planos"
          title="Escolha o protocolo ideal para o seu objetivo"
          description="Todos os planos são calculados a partir dos seus dados e liberados imediatamente após a confirmação do Pix."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
      </Container>

      <Container className="pb-16 sm:pb-24">
        <HealthCalculatorWidget />
      </Container>

      <Faq />
    </>
  );
}
