// Display helpers. Dates are stored as plain "YYYY-MM-DD" strings, so we build
// the Date by hand instead of `new Date(string)` — that would read the string as
// UTC and can show the previous day in Vancouver.

export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function todayInVancouver() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Vancouver" });
}

export function addDaysYmd(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function dateGroupLabel(iso: string, today: string) {
  if (iso === today) return `Today · ${formatDate(iso)}`;
  if (iso === addDaysYmd(today, 1)) return `Tomorrow · ${formatDate(iso)}`;
  if (iso === addDaysYmd(today, -1)) return `Yesterday · ${formatDate(iso)}`;
  return formatDate(iso);
}
