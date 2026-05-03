// NYSE 2026 trading calendar.
// Source: https://www.nyse.com/markets/hours-calendars (fetched 2026-05-02).
// Annual refresh: replace this file with the 2027 calendar before 2027-01-01.

export type MarketSession = "pre-market" | "open" | "after-hours" | "closed";

const FULL_CLOSURES_2026 = new Set<string>([
  "2026-01-01", // New Year's Day
  "2026-01-19", // Martin Luther King, Jr. Day
  "2026-02-16", // Washington's Birthday
  "2026-04-03", // Good Friday
  "2026-05-25", // Memorial Day
  "2026-06-19", // Juneteenth
  "2026-07-03", // Independence Day (observed)
  "2026-09-07", // Labor Day
  "2026-11-26", // Thanksgiving
  "2026-12-25", // Christmas Day
]);

const HALF_DAYS_2026 = new Set<string>([
  "2026-11-27", // Day after Thanksgiving — close 13:00 ET
  "2026-12-24", // Christmas Eve — close 13:00 ET
]);

const ET_PARTS_FMT = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function getEtParts(now: Date): {
  dateKey: string;
  weekday: string;
  minutesIntoDay: number;
} {
  const parts = ET_PARTS_FMT.formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  const dateKey = `${get("year")}-${get("month")}-${get("day")}`;
  const weekday = get("weekday");
  const hour = parseInt(get("hour"), 10);
  const minute = parseInt(get("minute"), 10);
  return { dateKey, weekday, minutesIntoDay: hour * 60 + minute };
}

const PRE_MARKET_OPEN_MIN = 4 * 60; // 04:00 ET — common retail extended-hours window
const REGULAR_OPEN_MIN = 9 * 60 + 30; // 09:30 ET
const REGULAR_CLOSE_MIN = 16 * 60; // 16:00 ET
const HALF_DAY_CLOSE_MIN = 13 * 60; // 13:00 ET (early-closure days)
const AFTER_HOURS_END_MIN = 20 * 60; // 20:00 ET
const HALF_DAY_AFTER_HOURS_END_MIN = 17 * 60; // 17:00 ET on early-close days

export function getMarketSession(now: Date = new Date()): MarketSession {
  const { dateKey, weekday, minutesIntoDay } = getEtParts(now);

  if (weekday === "Sat" || weekday === "Sun") return "closed";
  if (FULL_CLOSURES_2026.has(dateKey)) return "closed";

  const isHalfDay = HALF_DAYS_2026.has(dateKey);
  const closeMin = isHalfDay ? HALF_DAY_CLOSE_MIN : REGULAR_CLOSE_MIN;
  const afterHoursEndMin = isHalfDay
    ? HALF_DAY_AFTER_HOURS_END_MIN
    : AFTER_HOURS_END_MIN;

  if (minutesIntoDay < PRE_MARKET_OPEN_MIN) return "closed";
  if (minutesIntoDay < REGULAR_OPEN_MIN) return "pre-market";
  if (minutesIntoDay < closeMin) return "open";
  if (minutesIntoDay < afterHoursEndMin) return "after-hours";
  return "closed";
}
