import { EmptyPanel } from "@/components/shell/empty-panel";

export default function MemosPage() {
  return (
    <div className="px-8 py-6">
      <EmptyPanel
        title="Memos"
        body="No memos yet. Memos generate after a research job completes."
      />
    </div>
  );
}
