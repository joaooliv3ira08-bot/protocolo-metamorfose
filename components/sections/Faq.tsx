import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { faq } from "@/content/site";

export function Faq() {
  return (
    <section className="border-t border-border py-16 sm:py-24">
      <Container>
        <SectionTitle eyebrow="Dúvidas frequentes" title="Perguntas frequentes" align="center" />
        <div className="mx-auto mt-10 max-w-2xl divide-y divide-border">
          {faq.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between rounded-md text-left text-base font-medium text-ink">
                {item.question}
                <span className="ml-4 text-primary transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-ink-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
