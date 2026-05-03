"use client";

import { useState, useTransition } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "chart", label: "Chart" },
  { id: "fundamentals", label: "Fundamentals" },
  { id: "research", label: "Research History" },
  { id: "triggers", label: "Triggers" },
  { id: "thesis", label: "Thesis" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TRIGGER_CLASSES = cn(
  // flex-none overrides primitive's flex-1 (which stretches each tab to 1/6
  // of the row); we want content-width tabs grouped left per Linear pattern.
  "h-9 flex-none rounded-none border-0 bg-transparent px-0 text-sm font-medium",
  "text-text-3 hover:text-text-2 data-active:text-text-1",
  "data-active:bg-transparent data-active:shadow-none",
  // Override primitive's after:bottom-[-5px] + after:h-0.5 + after:bg-foreground
  // for a 2px accent border at the tab's actual bottom edge.
  // Thickness is 2px (not 1px) per the codebase's active-state-indicator
  // floor on dark canvas — 1px reads as structural hairline, not state.
  "after:!bottom-0 after:!h-0.5 after:!bg-accent",
);

const PANEL_CLASSES = "px-8 py-6";

export function TickerTabs() {
  const [active, setActive] = useState<TabId>("overview");
  const [, startTransition] = useTransition();

  const onValueChange = (next: string | null) => {
    if (!next) return;
    startTransition(() => {
      setActive(next as TabId);
    });
  };

  return (
    <Tabs value={active} onValueChange={onValueChange}>
      <TabsList
        variant="line"
        className="h-10 w-full justify-start gap-6 rounded-none border-b border-border-subtle bg-transparent px-8"
      >
        {TABS.map((t) => (
          <TabsTrigger key={t.id} value={t.id} className={TRIGGER_CLASSES}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="overview" className={PANEL_CLASSES}>
        {/* Overview content lands in subsequent THS-6 steps */}
      </TabsContent>

      <TabsContent value="chart" className={PANEL_CLASSES}>
        {/* Deferred-feature structural placeholder. animate-pulse intentionally
            stripped — not a fetch in progress. Per feedback_empty_state_asymmetry. */}
        <Skeleton className="h-80 w-full animate-none rounded-md" />
      </TabsContent>

      <TabsContent value="fundamentals" className={PANEL_CLASSES}>
        {/* Deferred-feature structural placeholder for the G7 5-field snapshot
            (Market Cap / P/E (TTM) / FCF Yield / Net Debt / EBITDA). animate-pulse
            intentionally stripped — not a fetch in progress. */}
        <div className="grid grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-20 animate-none rounded" />
              <Skeleton className="h-6 w-24 animate-none rounded" />
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="research" className={PANEL_CLASSES}>
        <p className="text-sm text-text-3">No research yet. Available with THS-7.</p>
      </TabsContent>

      <TabsContent value="triggers" className={PANEL_CLASSES}>
        <p className="text-sm text-text-3">
          No active triggers. Evaluator ships with THS-9.
        </p>
      </TabsContent>

      <TabsContent value="thesis" className={PANEL_CLASSES}>
        <p className="text-sm text-text-3">Thesis tracking ships post-Phase 1.</p>
      </TabsContent>
    </Tabs>
  );
}
