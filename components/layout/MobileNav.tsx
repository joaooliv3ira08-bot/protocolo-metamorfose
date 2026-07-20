"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { nav } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div id="mobile-nav" className="border-b border-border bg-base md:hidden">
      <nav aria-label="Navegação móvel" className="flex flex-col gap-1 px-5 py-4">
        {nav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            ref={i === 0 ? firstLinkRef : undefined}
            onClick={onClose}
            className="focus-ring rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-surface-raised"
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-2">
          <LinkButton href="/planos" className="w-full">
            Ver planos
          </LinkButton>
        </div>
      </nav>
    </div>
  );
}
