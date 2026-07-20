"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(formData: FormData) {
    const nextErrors: Record<string, string> = {};
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (name.length < 2) nextErrors.name = "Informe seu nome completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Informe um e-mail válido.";
    if (message.length < 10) nextErrors.message = "Descreva sua dúvida com um pouco mais de detalhe.";

    return nextErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Falha no envio");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-md border border-success/40 bg-success/10 p-4 text-sm text-ink">
        Mensagem enviada. Responderemos pelo e-mail informado o mais rápido possível.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Nome completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="focus-ring mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-ink"
        />
        {errors.name ? (
          <p id="name-error" role="alert" className="mt-1 text-xs text-danger">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="focus-ring mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-ink"
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="mt-1 text-xs text-danger">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Sua dúvida
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="focus-ring mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-ink"
        />
        {errors.message ? (
          <p id="message-error" role="alert" className="mt-1 text-xs text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-danger">
          Não foi possível enviar sua mensagem agora. Tente novamente em instantes.
        </p>
      ) : null}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}
