"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

// A calendar date picker that speaks the same "YYYY-MM-DD" string the rest of
// the app uses (bookings.service_date). We convert to/from Date by hand rather
// than `new Date(string)` so the value never shifts a day in another timezone
// — same reasoning as lib/format.ts.

type Props = {
  label: string;
  value: string; // "YYYY-MM-DD" or "" when nothing is picked yet
  onChange: (value: string) => void;
};

function parseYmd(value: string): Date | undefined {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

function toYmd(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function DateField({ label, value, onChange }: Props) {
  const selected = parseYmd(value);

  // Midnight today, so the current day stays selectable but past days don't.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="border border-gray-300 rounded-lg p-3 inline-block">
        <DayPicker
          mode="single"
          required={false}
          selected={selected}
          onSelect={(date) => onChange(date ? toYmd(date) : "")}
          disabled={{ before: today }}
          style={
            {
              "--rdp-accent-color": "#059669", // emerald-600
              "--rdp-accent-background-color": "#ecfdf5", // emerald-50
              "--rdp-today-color": "#059669",
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
