export default function Loading() {
  return (
    <>
      <div className="flex items-center gap-3 border-b border-border-subtle px-8 py-6">
        <div className="h-6 w-16 animate-pulse rounded bg-surface-2" />
        <div className="h-6 w-48 animate-pulse rounded bg-surface-2" />
        <div className="ml-auto h-4 w-28 animate-pulse rounded bg-surface-2" />
      </div>
      <div className="flex items-baseline gap-4 px-8 py-6">
        <div className="h-7 w-28 animate-pulse rounded bg-surface-2" />
        <div className="h-5 w-32 animate-pulse rounded bg-surface-2" />
      </div>
    </>
  );
}
