import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getAllPlans, getPlanBySlug } from "@/lib/plans-data";
import { CheckoutClient } from "./CheckoutClient";

export function generateStaticParams() {
  return getAllPlans().map((plan) => ({ slug: plan.slug }));
}

export const metadata = { title: "Checkout" };

export default function CheckoutPage({ params }: { params: { slug: string } }) {
  const plan = getPlanBySlug(params.slug);
  if (!plan) notFound();

  return (
    <Container className="max-w-xl py-16 sm:py-24">
      <CheckoutClient plan={plan} />
    </Container>
  );
}
