import { describe, expect, it } from "vitest";

import { getExchangeLabel } from "@/lib/market/exchange";

describe("getExchangeLabel", () => {
  it.each([
    ["XNAS", "NASDAQ"],
    ["XNYS", "NYSE"],
    ["ARCX", "NYSE Arca"],
    ["BATS", "Cboe BZX"],
    ["IEXG", "IEX"],
    ["UNKN", "UNKN"],
  ])("maps %s to %s", (mic, label) => {
    expect(getExchangeLabel(mic)).toBe(label);
  });
});
