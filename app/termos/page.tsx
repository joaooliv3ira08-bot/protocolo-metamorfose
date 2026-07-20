import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { legalNotice } from "@/content/site";

export const metadata: Metadata = { title: "Termos de Uso" };

export default function TermosPage() {
  return (
    <Container className="max-w-prose py-16 sm:py-24">
      <SectionTitle eyebrow="Legal" title="Termos de Uso" />

      <div className="mt-6 rounded-md border border-warning/40 bg-warning/10 p-4 text-sm text-ink">
        {legalNotice}
      </div>

      <div className="mt-8 space-y-6 text-sm text-ink-muted">
        <section>
          <h2 className="font-display text-base font-semibold text-ink">1. Sobre o serviço</h2>
          <p className="mt-2">
            TODO: descrever formalmente a natureza dos planos de treino e alimentação vendidos, deixando
            claro que não substituem acompanhamento médico e, quando aplicável, orientação de um
            profissional habilitado presencialmente.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-semibold text-ink">2. Pagamento e acesso</h2>
          <p className="mt-2">
            TODO: descrever as condições de pagamento via Pix, o prazo de liberação do acesso e o que fazer
            em caso de falha na liberação após pagamento confirmado.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-semibold text-ink">3. Reembolso e cancelamento</h2>
          <p className="mt-2">
            TODO: definir a política de reembolso aplicável, incluindo o direito de arrependimento previsto
            no Código de Defesa do Consumidor para compras realizadas fora do estabelecimento comercial.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-semibold text-ink">4. Limitação de responsabilidade</h2>
          <p className="mt-2">
            TODO: revisar com um profissional jurídico antes da publicação.
          </p>
        </section>
      </div>
    </Container>
  );
}
