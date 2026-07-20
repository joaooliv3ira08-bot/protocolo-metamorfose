import { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary/40 ${className}`}
      {...props}
    />
  );
}
