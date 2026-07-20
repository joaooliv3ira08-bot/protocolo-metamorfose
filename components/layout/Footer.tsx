import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig, contact, socialLinks, nav } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold text-ink">{siteConfig.shortName}</p>
          <p className="mt-3 max-w-xs text-sm text-ink-muted">{siteConfig.description}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Navegação</p>
          <ul className="mt-3 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="focus-ring rounded-md text-sm text-ink-muted hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Contato</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>
              <a href={`mailto:${contact.email}`} className="focus-ring rounded-md hover:text-ink">
                {contact.email}
              </a>
            </li>
            <li>{contact.whatsapp ? <a href={`https://wa.me/${contact.whatsapp}`}>WhatsApp</a> : "WhatsApp: a informar"}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Redes sociais</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {socialLinks.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="focus-ring rounded-md hover:text-ink">
                  {s.label} — {s.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-3 border-t border-border py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
        </p>
        <div className="flex gap-4">
          <Link href="/privacidade" className="focus-ring rounded-md hover:text-ink">
            Política de Privacidade
          </Link>
          <Link href="/termos" className="focus-ring rounded-md hover:text-ink">
            Termos de Uso
          </Link>
        </div>
      </Container>
    </footer>
  );
}
