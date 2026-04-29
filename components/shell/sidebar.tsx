"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { NAV_SECTIONS } from "./nav-config";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="sticky top-12 flex h-[calc(100vh-48px)] w-[220px] flex-col gap-2 overflow-y-auto px-2 py-4"
      style={{
        background: "var(--color-bg)",
        borderRight: "1px solid var(--color-border-subtle)",
      }}
    >
      {NAV_SECTIONS.map((section) => (
        <div key={section.label} className="flex flex-col gap-[2px]">
          <div
            className="text-[11px] font-medium uppercase"
            style={{
              color: "var(--color-text-3)",
              letterSpacing: "0.06em",
              padding: "12px 10px 6px",
            }}
          >
            {section.label}
          </div>
          {section.items.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-[10px] rounded-[5px] text-[13px] transition-colors duration-[120ms]",
                )}
                style={{
                  padding: "6px 10px",
                  color: active
                    ? "var(--color-text-1)"
                    : "var(--color-text-2)",
                  background: active ? "var(--color-surface)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (active) return;
                  e.currentTarget.style.background = "var(--color-surface)";
                  e.currentTarget.style.color = "var(--color-text-1)";
                }}
                onMouseLeave={(e) => {
                  if (active) return;
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--color-text-2)";
                }}
              >
                {active && (
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: -8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 2,
                      height: 16,
                      background: "var(--color-accent)",
                      borderRadius: "0 2px 2px 0",
                    }}
                  />
                )}
                <Icon size={14} style={{ opacity: active ? 1 : 0.8 }} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
