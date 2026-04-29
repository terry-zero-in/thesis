export type MemoStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "revised"
  | null;

export type WatchlistRow = {
  id: string;
  tickerId: string;
  symbol: string;
  companyName: string | null;
  sector: string | null;
  targetPrice: number | null;
  conviction: number | null;
  addedAt: string;
  latestMemoStatus: MemoStatus;
  latestResearchAt: string | null;
};
