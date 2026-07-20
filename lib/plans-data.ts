import { plans, Plan } from "@/content/site";

export function getAllPlans(): Plan[] {
  return plans;
}

export function getPlanBySlug(slug: string): Plan | undefined {
  return plans.find((plan) => plan.slug === slug);
}
