import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section className="border-t border-border bg-surface py-16">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-xl font-display text-2xl font-semibold text-ink sm:text-3xl">
          Pronto para treinar e se alimentar com base nos seus próprios números?
        </h2>
        <LinkButton href="/planos" size="lg">
          Ver planos disponíveis
        </LinkButton>
      </Container>
    </section>
  );
}
