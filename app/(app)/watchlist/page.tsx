import { EmptyPanel } from "@/components/shell/empty-panel";

export default function WatchlistPage() {
  return (
    <div className="px-8 py-6">
      <EmptyPanel
        title="Watchlist"
        body="No tickers in your watchlist yet. Add one to start tracking."
      />
    </div>
  );
}
