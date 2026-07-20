import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { legalNotice } from "@/content/site";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function PrivacidadePage() {
  return (
    <Container className="max-w-prose py-16 sm:py-24">
      <SectionTitle eyebrow="Legal" title="Política de Privacidade" />

      <div className="mt-6 rounded-md border border-warning/40 bg-warning/10 p-4 text-sm text-ink">
        {legalNotice}
      </div>

      <div className="mt-8 space-y-6 text-sm text-ink-muted">
        <section>
          <h2 className="font-display text-base font-semibold text-ink">1. Dados coletados</h2>
          <p className="mt-2">
            TODO: descrever com precisão jurídica quais dados são coletados pelo formulário de contato
            (nome, e-mail, mensagem) e pelo checkout (nome, e-mail, CPF), e para qual finalidade cada um é
            usado.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-semibold text-ink">2. Uso dos dados</h2>
          <p className="mt-2">
            TODO: descrever o uso dos dados de checkout para processamento do pagamento via Pix e liberação
            de acesso ao plano adquirido, e do formulário de contato para resposta ao atendimento.
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-semibold text-ink">3. Compartilhamento com terceiros</h2>
          <p className="mt-2">
            TODO: listar o provedor de pagamento utilizado em produção e quaisquer outros serviços que
            recebam dados pessoais (ex.: envio de e-mail).
          </p>
        </section>
        <section>
          <h2 className="font-display text-base font-semibold text-ink">4. Direitos do titular</h2>
          <p className="mt-2">
            TODO: descrever como o usuário pode solicitar acesso, correção ou exclusão dos seus dados, com o
            canal de contato definido para esse fim.
          </p>
        </section>
      </div>
    </Container>
  );
}
