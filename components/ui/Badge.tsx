import { ReactNode } from "react";

export function Badge({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "muted" }) {
  const toneClasses =
    tone === "primary"
      ? "bg-primary/10 text-primary border-primary/30"
      : "bg-surface-raised text-ink-muted border-border";
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${toneClasses}`}>
      {children}
    </span>
  );
}
