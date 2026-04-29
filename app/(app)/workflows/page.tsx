import { EmptyPanel } from "@/components/shell/empty-panel";

export default function WorkflowsPage() {
  return (
    <div className="px-8 py-6">
      <EmptyPanel
        title="Workflows"
        body="No workflows configured yet."
      />
    </div>
  );
}
