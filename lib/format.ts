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
