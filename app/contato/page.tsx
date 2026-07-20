import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/forms/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com o suporte do Protocolo Metamorfose.",
};

export default function ContatoPage() {
  return (
    <>
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="Contato e suporte" title="Fale com a gente" />
          <p className="mt-4 max-w-prose text-ink-muted">
            Use o formulário para dúvidas gerais, problemas de acesso ao plano ou informações sobre os
            protocolos.
          </p>

          <dl className="mt-8 space-y-3 text-sm">
            <div>
              <dt className="text-ink-muted">E-mail</dt>
              <dd>
                <a href={`mailto:${contact.email}`} className="focus-ring rounded-md font-medium text-ink hover:text-primary">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-muted">WhatsApp</dt>
              <dd className="font-medium text-ink">
                {contact.whatsapp ? (
                  <a href={`https://wa.me/${contact.whatsapp}`} className="focus-ring rounded-md hover:text-primary">
                    Abrir conversa
                  </a>
                ) : (
                  "A informar"
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <ContactForm />
        </div>
      </Container>
      <Faq />
    </>
  );
}
