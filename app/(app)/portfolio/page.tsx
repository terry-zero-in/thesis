import { EmptyPanel } from "@/components/shell/empty-panel";

export default function PortfolioPage() {
  return (
    <div className="px-8 py-6">
      <EmptyPanel
        title="Portfolio"
        body="No positions tracked yet. Add a position from any ticker detail page."
      />
    </div>
  );
}
