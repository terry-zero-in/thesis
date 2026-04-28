export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="flex items-baseline justify-center gap-3">
          <h1 className="text-[18px] font-medium tracking-[-0.015em] text-[var(--color-text-1)]">
            AI Thesis
          </h1>
          <span className="h-3.5 w-px bg-[var(--color-border)]" />
          <span className="text-[13px] text-[var(--color-text-2)]">
            Investment OS
          </span>
        </div>
        <p className="mt-6 text-[13px] text-[var(--color-text-3)]">
          THS-1 scaffold. Visit{" "}
          <a
            href="/tokens"
            className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
          >
            /tokens
          </a>{" "}
          to verify the design system.
        </p>
      </div>
    </main>
  );
}
