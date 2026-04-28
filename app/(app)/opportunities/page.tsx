import { EmptyPanel } from "@/components/shell/empty-panel";

export default function OpportunitiesPage() {
  return (
    <div className="px-8 py-6">
      <EmptyPanel
        title="Opportunities"
        body="No opportunities flagged yet."
      />
    </div>
  );
}
