import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-32 text-center">
      <p className="font-mono-data text-sm text-primary">Erro 404</p>
      <h1 className="font-display text-3xl font-bold text-ink">Página não encontrada</h1>
      <p className="max-w-md text-ink-muted">
        O endereço acessado não existe ou foi movido. Volte para a página inicial ou veja os planos disponíveis.
      </p>
      <div className="mt-4 flex gap-3">
        <LinkButton href="/">Ir para o início</LinkButton>
        <LinkButton href="/planos" variant="secondary">
          Ver planos
        </LinkButton>
      </div>
    </Container>
  );
}
