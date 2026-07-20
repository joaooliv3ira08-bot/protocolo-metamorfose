import { Hero } from "@/components/sections/Hero";
import { Differentiators } from "@/components/sections/Differentiators";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PlansPreview } from "@/components/sections/PlansPreview";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Differentiators />
      <ProcessSteps />
      <PlansPreview />
      <Faq />
      <CtaBanner />
    </>
  );
}
