"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Copy, Loader2, QrCode } from "lucide-react";
import { Plan } from "@/content/site";
import { contact } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { formatBRL } from "@/lib/format";

type Step = "form" | "gerando" | "aguardando" | "confirmando";

interface ChargeState {
  orderId: string;
  qrCodeText: string;
  amount: number;
  expiresAt: string;
}

export function CheckoutClient({ plan }: { plan: Plan }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [charge, setCharge] = useState<ChargeState | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!charge) return;
    const update = () => {
      const diff = Math.max(0, Math.floor((new Date(charge.expiresAt).getTime() - Date.now()) / 1000));
      setSecondsLeft(diff);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [charge]);

  function validate(formData: FormData) {
    const nextErrors: Record<string, string> = {};
    const name = String(formData.get("buyerName") || "").trim();
    const email = String(formData.get("buyerEmail") || "").trim();
    const document = String(formData.get("buyerDocument") || "").replace(/\D/g, "");

    if (name.length < 2) nextErrors.buyerName = "Informe seu nome completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.buyerEmail = "Informe um e-mail válido.";
    if (document.length !== 11) nextErrors.buyerDocument = "Informe um CPF com 11 dígitos.";

    return nextErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setApiError(null);
    const formData = new FormData(e.currentTarget);
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStep("gerando");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planSlug: plan.slug,
          buyerName: formData.get("buyerName"),
          buyerEmail: formData.get("buyerEmail"),
          buyerDocument: formData.get("buyerDocument"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao gerar o Pix.");

      setCharge({
        orderId: data.order.id,
        qrCodeText: data.charge.qrCodeText,
        amount: data.charge.amount,
        expiresAt: data.charge.expiresAt,
      });
      setStep("aguardando");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Erro ao gerar o Pix.");
      setStep("form");
    }
  }

  async function handleCopy() {
    if (!charge) return;
    await navigator.clipboard.writeText(charge.qrCodeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSimulateConfirmation() {
    if (!charge) return;
    setStep("confirmando");
    try {
      const res = await fetch("/api/checkout/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: charge.orderId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Não foi possível confirmar o pagamento.");
      router.push(`/confirmacao?plano=${plan.slug}&pedido=${charge.orderId}`);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Erro ao confirmar pagamento.");
      setStep("aguardando");
    }
  }

  if (step === "aguardando" || step === "confirmando") {
    const minutes = secondsLeft !== null ? Math.floor(secondsLeft / 60) : 0;
    const seconds = secondsLeft !== null ? secondsLeft % 60 : 0;

    return (
      <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold text-ink">Pague com Pix</h1>
        <p className="mt-1 text-sm text-ink-muted">{plan.name}</p>

        <div className="mt-6 flex flex-col items-center rounded-md border border-dashed border-border bg-base p-6 text-center">
          <QrCode className="h-32 w-32 text-primary" aria-hidden="true" />
          <p className="mt-3 text-xs text-ink-muted">
            QR Code simulado (ambiente de desenvolvimento) — em produção, este espaço exibe o QR Code real
            gerado pelo provedor de pagamento.
          </p>
        </div>

        <div className="mt-5">
          <p className="text-xs font-medium text-ink-muted">Pix copia e cola</p>
          <div className="mt-1.5 flex items-stretch gap-2">
            <code className="flex-1 truncate rounded-md border border-border bg-base px-3 py-2 text-xs text-ink-muted">
              {charge?.qrCodeText}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="focus-ring flex items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-ink hover:border-primary/60"
            >
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5">
          <div>
            <dt className="text-xs text-ink-muted">Valor</dt>
            <dd className="font-mono-data text-lg font-semibold text-ink">
              {charge ? formatBRL(charge.amount) : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-ink-muted">Destinatário</dt>
            <dd className="text-sm text-ink">Protocolo Metamorfose</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-ink-muted">Expira em</dt>
            <dd className="font-mono-data text-sm text-ink" aria-live="polite">
              {secondsLeft !== null
                ? `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
                : "—"}
            </dd>
          </div>
        </dl>

        {apiError ? (
          <p role="alert" className="mt-4 text-sm text-danger">
            {apiError}
          </p>
        ) : null}

        <div className="mt-6 rounded-md border border-warning/40 bg-warning/10 p-4 text-xs text-ink">
          Ambiente de desenvolvimento: use o botão abaixo para simular a confirmação do pagamento. Em
          produção, esta etapa acontece automaticamente após o webhook do provedor de pagamento confirmar o
          Pix.
        </div>

        <Button
          onClick={handleSimulateConfirmation}
          disabled={step === "confirmando"}
          className="mt-4 w-full"
        >
          {step === "confirmando" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Confirmando...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Simular pagamento confirmado
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
      <h1 className="font-display text-2xl font-bold text-ink">Finalizar compra</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {plan.name} · <span className="font-mono-data">{formatBRL(plan.price)}</span>
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <div>
          <label htmlFor="buyerName" className="text-sm font-medium text-ink">
            Nome completo
          </label>
          <input
            id="buyerName"
            name="buyerName"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.buyerName)}
            aria-describedby={errors.buyerName ? "buyerName-error" : undefined}
            className="focus-ring mt-1.5 w-full rounded-md border border-border bg-base px-3 py-2.5 text-ink"
          />
          {errors.buyerName ? (
            <p id="buyerName-error" role="alert" className="mt-1 text-xs text-danger">
              {errors.buyerName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="buyerEmail" className="text-sm font-medium text-ink">
            E-mail
          </label>
          <input
            id="buyerEmail"
            name="buyerEmail"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.buyerEmail)}
            aria-describedby={errors.buyerEmail ? "buyerEmail-error" : undefined}
            className="focus-ring mt-1.5 w-full rounded-md border border-border bg-base px-3 py-2.5 text-ink"
          />
          {errors.buyerEmail ? (
            <p id="buyerEmail-error" role="alert" className="mt-1 text-xs text-danger">
              {errors.buyerEmail}
            </p>
          ) : null}
          <p className="mt-1 text-xs text-ink-muted">O link de acesso ao plano será associado a este e-mail.</p>
        </div>

        <div>
          <label htmlFor="buyerDocument" className="text-sm font-medium text-ink">
            CPF
          </label>
          <input
            id="buyerDocument"
            name="buyerDocument"
            type="text"
            inputMode="numeric"
            placeholder="000.000.000-00"
            aria-invalid={Boolean(errors.buyerDocument)}
            aria-describedby={errors.buyerDocument ? "buyerDocument-error" : undefined}
            className="focus-ring mt-1.5 w-full rounded-md border border-border bg-base px-3 py-2.5 text-ink"
          />
          {errors.buyerDocument ? (
            <p id="buyerDocument-error" role="alert" className="mt-1 text-xs text-danger">
              {errors.buyerDocument}
            </p>
          ) : null}
        </div>

        {apiError ? (
          <p role="alert" className="text-sm text-danger">
            {apiError}
          </p>
        ) : null}

        <Button type="submit" disabled={step === "gerando"} className="w-full">
          {step === "gerando" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Gerando Pix...
            </>
          ) : (
            "Gerar Pix"
          )}
        </Button>
        <p className="text-center text-xs text-ink-muted">
          Seus dados são usados apenas para processar o pagamento e liberar o acesso ao plano.
        </p>
      </form>

      {contact.whatsapp ? (
        <a
          href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
            `Olá! Quero comprar o ${plan.name} (${formatBRL(plan.price)}).`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-ink-muted transition-colors hover:border-success/40 hover:text-success"
        >
          Prefere finalizar pelo WhatsApp?
        </a>
      ) : null}
    </div>
  );
}
