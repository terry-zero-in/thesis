import { EmptyPanel } from "@/components/shell/empty-panel";

export default function DashboardPage() {
  return (
    <div className="px-8 py-6">
      <EmptyPanel
        title="Dashboard"
        body="Portfolio summary, pending decisions, and the live trigger feed appear here as research runs and decisions are recorded."
      />
    </div>
  );
}
