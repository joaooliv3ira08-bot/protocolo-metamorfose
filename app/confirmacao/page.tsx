import Link from "next/link";
import { CheckCircle2, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { getPlanBySlug } from "@/lib/plans-data";

export const metadata = { title: "Pagamento confirmado" };

export default function ConfirmacaoPage({
  searchParams,
}: {
  searchParams: { plano?: string; pedido?: string };
}) {
  const plan = searchParams.plano ? getPlanBySlug(searchParams.plano) : undefined;

  return (
    <Container className="flex max-w-lg flex-col items-center py-20 text-center sm:py-28">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
        <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
      </div>

      <h1 className="mt-6 font-display text-2xl font-bold text-ink sm:text-3xl">Pagamento confirmado</h1>
      <p className="mt-3 text-ink-muted">
        {plan ? (
          <>
            Seu acesso ao <strong className="text-ink">{plan.name}</strong> já está liberado.
          </>
        ) : (
          "Seu pagamento foi confirmado e o acesso ao plano já está liberado."
        )}
      </p>

      <div className="mt-8 w-full rounded-lg border border-border bg-surface p-6">
        <p className="text-sm text-ink-muted">
          TODO (produção): substituir este bloco pelo link de download real do PDF do plano, gerado e
          associado ao pedido{searchParams.pedido ? ` ${searchParams.pedido}` : ""} após a confirmação do
          webhook de pagamento.
        </p>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="focus-ring mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-ink opacity-60"
          aria-disabled="true"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Baixar plano (exemplo)
        </a>
      </div>

      <p className="mt-6 text-xs text-ink-muted">
        Uma cópia do link também será enviada para o e-mail informado no checkout, quando o envio automático
        estiver configurado.
      </p>

      <Link href="/" className="focus-ring mt-8 rounded-md text-sm font-medium text-ink-muted underline hover:text-ink">
        Voltar para o início
      </Link>
    </Container>
  );
}
