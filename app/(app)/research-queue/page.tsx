import { EmptyPanel } from "@/components/shell/empty-panel";

export default function ResearchQueuePage() {
  return (
    <div className="px-8 py-6">
      <EmptyPanel
        title="Research Queue"
        body="No research jobs. Jobs appear when triggers fire or when started manually from a ticker."
      />
    </div>
  );
}
