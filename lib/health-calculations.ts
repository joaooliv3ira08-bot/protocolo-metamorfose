// Cálculos de TMB (Taxa de Metabolismo Basal) e TDEE (Gasto Energético Total)
// usando a fórmula de Mifflin-St Jeor, referência padrão para estimativas
// nutricionais. Usado para ilustrar o método na interface (widget "Simulador").
// Os cálculos reais entregues em cada plano seguem o processo interno do
// profissional responsável, não apenas este widget de demonstração.

export type Sex = "feminino" | "masculino";

export interface TmbInput {
  sex: Sex;
  weightKg: number;
  heightCm: number;
  age: number;
}

export type ActivityLevel =
  | "sedentario"
  | "leve"
  | "moderado"
  | "intenso"
  | "muito_intenso";

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  intenso: 1.725,
  muito_intenso: 1.9,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentario: "Sedentário (pouco ou nenhum exercício)",
  leve: "Leve (1 a 3x por semana)",
  moderado: "Moderado (3 a 5x por semana)",
  intenso: "Intenso (6 a 7x por semana)",
  muito_intenso: "Muito intenso (2x por dia ou trabalho físico)",
};

export function calculateTmb(input: TmbInput): number {
  const { sex, weightKg, heightCm, age } = input;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(sex === "masculino" ? base + 5 : base - 161);
}

export function calculateTdee(tmb: number, activity: ActivityLevel): number {
  return Math.round(tmb * ACTIVITY_MULTIPLIERS[activity]);
}
