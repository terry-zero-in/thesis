import { EmptyPanel } from "@/components/shell/empty-panel";

export default function SettingsPage() {
  return (
    <div className="px-8 py-6">
      <EmptyPanel
        title="Settings"
        body="API keys, agent preferences, and email delivery configuration appear here."
      />
    </div>
  );
}
