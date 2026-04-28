type Props = {
  title: string;
  body: string;
  meta?: string;
};

export function EmptyPanel({ title, body, meta }: Props) {
  return (
    <section
      className="overflow-hidden rounded-md"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border-subtle)",
      }}
    >
      <header
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid var(--color-border-subtle)" }}
      >
        <h2
          className="text-[13px] font-medium tracking-[-0.005em]"
          style={{ color: "var(--color-text-1)" }}
        >
          {title}
        </h2>
        {meta ? (
          <span
            className="tnum text-[11px]"
            style={{
              color: "var(--color-text-3)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {meta}
          </span>
        ) : null}
      </header>
      <div
        className="px-6 py-16 text-center text-[13px]"
        style={{ color: "var(--color-text-2)" }}
      >
        {body}
      </div>
    </section>
  );
}
