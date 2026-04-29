import { EmptyPanel } from "@/components/shell/empty-panel";

export default function DecisionsPage() {
  return (
    <div className="px-8 py-6">
      <EmptyPanel
        title="Decisions"
        body="No decisions logged yet. Approve, snooze, or reject a memo to record one."
      />
    </div>
  );
}
