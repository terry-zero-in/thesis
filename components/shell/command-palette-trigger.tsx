"use client";

import { Search } from "lucide-react";

import { useCommandPalette } from "./command-palette";

export function CommandPaletteTrigger() {
  const { setOpen } = useCommandPalette();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open command palette"
      className="flex h-7 flex-1 items-center gap-2 rounded-md px-2.5 text-[13px] transition-colors duration-[120ms]"
      style={{
        maxWidth: 480,
        background: "var(--color-surface)",
        border: "1px solid var(--color-border-subtle)",
        color: "var(--color-text-3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border-subtle)";
      }}
    >
      <Search size={14} aria-hidden />
      <span className="flex-1 text-left">Search</span>
      <kbd
        className="px-1.5 py-0.5 text-[11px]"
        style={{
          background: "var(--color-surface-2)",
          border: "1px solid var(--color-border)",
          borderRadius: 3,
          color: "var(--color-text-3)",
          fontFamily: "var(--font-mono)",
        }}
      >
        ⌘K
      </kbd>
    </button>
  );
}
