import { CommandPaletteTrigger } from "./command-palette-trigger";

type Props = {
  email: string;
  initials: string;
};

export function Topbar({ email, initials }: Props) {
  return (
    <header
      className="sticky top-0 z-10 flex h-12 items-center gap-4 px-4"
      style={{
        gridColumn: "1 / -1",
        background: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border-subtle)",
      }}
    >
      {/* Brand */}
      <div className="flex flex-shrink-0 items-center gap-3 pr-1">
        <span
          className="text-[14px] font-medium"
          style={{
            color: "var(--color-text-1)",
            letterSpacing: "-0.01em",
          }}
        >
          AI Thesis
        </span>
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 1,
            height: 14,
            background: "var(--color-border)",
          }}
        />
        <span
          className="text-[13px]"
          style={{ color: "var(--color-text-2)" }}
        >
          Investment OS
        </span>
      </div>

      {/* Search trigger (opens ⌘K palette) */}
      <CommandPaletteTrigger />

      {/* Right cluster */}
      <div
        className="ml-auto flex flex-shrink-0 items-center gap-3 text-[12px]"
        style={{ color: "var(--color-text-3)" }}
      >
        {/* Live indicator */}
        <span className="flex items-center gap-1.5">
          <span className="relative inline-block h-1.5 w-1.5">
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: "var(--color-success)" }}
            />
            <span
              className="absolute -inset-0.5 rounded-full"
              style={{
                background: "var(--color-success)",
                opacity: 0.4,
                animation: "pulseLive 2s infinite",
              }}
            />
          </span>
          <span
            className="text-[11px] font-medium uppercase"
            style={{
              color: "var(--color-success)",
              letterSpacing: "0.04em",
            }}
          >
            Market Live
          </span>
        </span>

        <span aria-hidden style={{ opacity: 0.6 }}>
          ·
        </span>

        <span
          className="tnum"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          3 alerts · 1 today
        </span>

        {/* Avatar */}
        <div
          className="ml-2 flex items-center justify-center text-[11px] font-medium"
          title={email}
          aria-label={email}
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-1)",
            letterSpacing: "0.02em",
          }}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
