interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="font-mono-data text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-ink-muted">{description}</p> : null}
    </div>
  );
}
