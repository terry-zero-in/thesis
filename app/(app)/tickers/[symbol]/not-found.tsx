import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-8 py-6 space-y-2">
      <h2 className="text-lg font-medium text-text-1">Ticker not found</h2>
      <Link href="/watchlist" className="text-accent hover:text-accent-hover">
        Back to watchlist
      </Link>
    </div>
  );
}
