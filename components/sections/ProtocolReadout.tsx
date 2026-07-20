"use client";

import { useEffect, useRef, useState } from "react";

// Elemento de assinatura visual: um "readout" de protocolo que ilustra,
// de forma ambiente, o cálculo de TMB/TDEE que fundamenta os planos —
// o diferencial central do método (ver components/sections/HealthCalculatorWidget
// para a versão interativa real, usada na página de Planos).

const TARGET = {
  tmb: 1612,
  tdee: 2495,
  proteina: 168,
  carboidrato: 260,
};

function useCountUp(target: number, durationMs = 1100) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

export function ProtocolReadout() {
  const tmb = useCountUp(TARGET.tmb);
  const tdee = useCountUp(TARGET.tdee);
  const proteina = useCountUp(TARGET.proteina);
  const carboidrato = useCountUp(TARGET.carboidrato);

  return (
    <div
      className="animate-fade-up rounded-xl border border-border bg-surface p-6 shadow-glow sm:p-8"
      style={{ animationDelay: "150ms" }}
      role="img"
      aria-label="Ilustração de um protocolo calculado, exibindo TMB, TDEE e distribuição de macronutrientes de exemplo"
    >
      <div className="flex items-center justify-between border-b border-border pb-4">
        <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-ink-muted">
          Protocolo — exemplo ilustrativo
        </p>
        <span className="flex items-center gap-1.5 text-xs text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
          calculado
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-ink-muted">TMB (basal)</p>
          <p className="font-mono-data mt-1 text-3xl font-bold text-ink">{tmb}</p>
          <p className="text-xs text-ink-muted">kcal/dia</p>
        </div>
        <div>
          <p className="text-xs text-ink-muted">TDEE (total)</p>
          <p className="font-mono-data mt-1 text-3xl font-bold text-gradient">{tdee}</p>
          <p className="text-xs text-ink-muted">kcal/dia</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-border pt-6">
        <MacroBar label="Proteína" value={proteina} unit="g" fraction={0.62} />
        <MacroBar label="Carboidrato" value={carboidrato} unit="g" fraction={0.85} />
      </div>

      <p className="mt-6 text-xs text-ink-muted">
        Valores ilustrativos. O cálculo do seu protocolo real usa os seus próprios dados.
      </p>
    </div>
  );
}

function MacroBar({ label, value, unit, fraction }: { label: string; value: number; unit: string; fraction: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-muted">{label}</span>
        <span className="font-mono-data text-ink">
          {value}
          {unit}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-raised">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700"
          style={{ width: `${fraction * 100}%` }}
        />
      </div>
    </div>
  );
}
