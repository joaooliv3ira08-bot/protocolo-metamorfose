import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça o método por trás do Protocolo Metamorfose.",
};

export default function SobrePage() {
  return (
    <>
      <Container className="py-16 sm:py-24">
        <SectionTitle eyebrow="Sobre" title="O método por trás do Protocolo Metamorfose" />

        <div className="mt-8 max-w-prose space-y-5 text-ink-muted">
          <p>
            O Protocolo Metamorfose nasceu para resolver um problema comum: planos de treino e alimentação
            genéricos, iguais para qualquer pessoa, que ignoram o gasto metabólico real de quem vai segui-los.
          </p>
          <p>
            Cada plano parte do cálculo do seu TMB (Taxa de Metabolismo Basal) e do seu TDEE (gasto energético
            total), ajustado ao seu nível de atividade e ao seu objetivo — para então definir a estrutura de
            treino e a distribuição de macronutrientes com base nesses números.
          </p>
          <p className="rounded-md border border-border bg-surface p-4 text-sm">
            TODO: inserir aqui a apresentação pessoal do responsável, formação, tempo de experiência e forma de
            trabalho, com as informações reais fornecidas pelo profissional. Este texto é um conteúdo provisório
            e não deve ser publicado sem revisão.
          </p>
        </div>
      </Container>
      <CtaBanner />
    </>
  );
}
