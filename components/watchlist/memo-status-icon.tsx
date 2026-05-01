import { Check, Loader2, Minus, X } from "lucide-react";

import type { MemoStatus } from "@/lib/watchlist/types";

export function MemoStatusIcon({ status }: { status: MemoStatus }) {
  if (status === "approved") {
    return <Check aria-label="approved" className="size-4 text-success" />;
  }
  if (status === "pending_approval" || status === "draft") {
    return (
      <Loader2
        aria-label="running"
        className="size-4 animate-spin text-warning"
      />
    );
  }
  if (status === "rejected") {
    return <X aria-label="rejected" className="size-4 text-danger" />;
  }
  return <Minus aria-label="none" className="size-4 text-text-3" />;
}
