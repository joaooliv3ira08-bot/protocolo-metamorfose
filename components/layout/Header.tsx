"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Activity } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { nav, siteConfig } from "@/content/site";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-base/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-md">
          <Activity className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="font-display text-base font-bold tracking-tight text-ink">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-md text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <LinkButton href="/planos" size="md">
            Ver planos
          </LinkButton>
        </div>

        <button
          type="button"
          className="focus-ring rounded-md p-2 text-ink md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </Container>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
