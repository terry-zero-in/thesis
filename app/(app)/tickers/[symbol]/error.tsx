"use client";

export default function ErrorBoundary({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="px-8 py-6 space-y-2">
      <h2 className="text-lg font-medium text-text-1">Something went wrong</h2>
      <p className="text-sm text-text-3">{error.message}</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="text-accent hover:text-accent-hover"
      >
        Try again
      </button>
    </div>
  );
}
