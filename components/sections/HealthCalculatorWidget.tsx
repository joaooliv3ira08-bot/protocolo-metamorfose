"use client";

import { FormEvent, useState } from "react";
import {
  ACTIVITY_LABELS,
  ACTIVITY_MULTIPLIERS,
  ActivityLevel,
  Sex,
  calculateTdee,
  calculateTmb,
} from "@/lib/health-calculations";

export function HealthCalculatorWidget() {
  const [sex, setSex] = useState<Sex>("feminino");
  const [weight, setWeight] = useState("65");
  const [height, setHeight] = useState("165");
  const [age, setAge] = useState("30");
  const [activity, setActivity] = useState<ActivityLevel>("moderado");
  const [result, setResult] = useState<{ tmb: number; tdee: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);

    if (!w || !h || !a || w <= 0 || h <= 0 || a <= 0) {
      setError("Preencha peso, altura e idade com valores válidos.");
      setResult(null);
      return;
    }

    setError(null);
    const tmb = calculateTmb({ sex, weightKg: w, heightCm: h, age: a });
    const tdee = calculateTdee(tmb, activity);
    setResult({ tmb, tdee });
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
      <h3 className="font-display text-lg font-semibold text-ink">Simulador de TMB e TDEE</h3>
      <p className="mt-1 text-sm text-ink-muted">
        Uma prévia do cálculo usado como ponto de partida dos planos. O protocolo entregue após a compra é
        elaborado com os seus dados completos e ajustado ao seu objetivo.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-ink">Sexo biológico</legend>
          <div className="mt-2 flex gap-3">
            {(["feminino", "masculino"] as Sex[]).map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-ink-muted">
                <input
                  type="radio"
                  name="sex"
                  value={option}
                  checked={sex === option}
                  onChange={() => setSex(option)}
                  className="focus-ring h-4 w-4 accent-primary"
                />
                {option === "feminino" ? "Feminino" : "Masculino"}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="weight" className="text-sm font-medium text-ink">
            Peso (kg)
          </label>
          <input
            id="weight"
            type="number"
            inputMode="decimal"
            min={1}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="focus-ring mt-1.5 w-full rounded-md border border-border bg-base px-3 py-2 text-ink"
          />
        </div>

        <div>
          <label htmlFor="height" className="text-sm font-medium text-ink">
            Altura (cm)
          </label>
          <input
            id="height"
            type="number"
            inputMode="decimal"
            min={1}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="focus-ring mt-1.5 w-full rounded-md border border-border bg-base px-3 py-2 text-ink"
          />
        </div>

        <div>
          <label htmlFor="age" className="text-sm font-medium text-ink">
            Idade
          </label>
          <input
            id="age"
            type="number"
            inputMode="numeric"
            min={1}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="focus-ring mt-1.5 w-full rounded-md border border-border bg-base px-3 py-2 text-ink"
          />
        </div>

        <div>
          <label htmlFor="activity" className="text-sm font-medium text-ink">
            Nível de atividade
          </label>
          <select
            id="activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value as ActivityLevel)}
            className="focus-ring mt-1.5 w-full rounded-md border border-border bg-base px-3 py-2 text-ink"
          >
            {(Object.keys(ACTIVITY_MULTIPLIERS) as ActivityLevel[]).map((level) => (
              <option key={level} value={level}>
                {ACTIVITY_LABELS[level]}
              </option>
            ))}
          </select>
        </div>

        {error ? (
          <p role="alert" className="sm:col-span-2 text-sm text-danger">
            {error}
          </p>
        ) : null}

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="focus-ring w-full rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-ink hover:opacity-90 sm:w-auto"
          >
            Calcular
          </button>
        </div>
      </form>

      {result ? (
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-md border border-border bg-base p-4" role="status">
          <div>
            <p className="text-xs text-ink-muted">TMB estimada</p>
            <p className="font-mono-data text-xl font-bold text-ink">{result.tmb} kcal/dia</p>
          </div>
          <div>
            <p className="text-xs text-ink-muted">TDEE estimado</p>
            <p className="font-mono-data text-xl font-bold text-gradient">{result.tdee} kcal/dia</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
