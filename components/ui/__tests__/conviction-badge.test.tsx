import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConvictionBadge } from "@/components/ui/conviction-badge";

describe("ConvictionBadge", () => {
  it.each([
    { score: 1, expectClass: "text-text-3", expectText: "1/10" },
    { score: 4, expectClass: "text-info", expectText: "4/10" },
    { score: 7, expectClass: "text-success/90", expectText: "7/10" },
    { score: 9, expectClass: "text-success", expectText: "9/10" },
    { score: null, expectClass: "text-text-3", expectText: "—" },
  ])("score=$score → text $expectText with $expectClass", ({ score, expectClass, expectText }) => {
    const { container } = render(<ConvictionBadge score={score} />);
    expect(screen.getByText(expectText)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(expectClass);
  });
});
