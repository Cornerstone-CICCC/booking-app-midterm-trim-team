export type LawnSize = "small" | "medium" | "large" | "extra_large";
export type TimeSlot = "morning" | "afternoon" | "full_day";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Booking = {
  id: number
  city: string
  street_address: string
  lawn_size: LawnSize
  full_name: string
  email: string
  phone: string
  service_date: string // "YYYY-MM-DD"
  time_slot: TimeSlot
  status: BookingStatus
  note: string | null
  created_at: string
  updated_at: string
}

// Metro Vancouver cities for the step 1 dropdown.
export const CITIES = [
  "Anmore",
  "Belcarra",
  "Bowen Island",
  "Burnaby",
  "Coquitlam",
  "Delta",
  "Langley",
  "Lions Bay",
  "Maple Ridge",
  "New Westminster",
  "North Vancouver",
  "Pitt Meadows",
  "Port Coquitlam",
  "Port Moody",
  "Richmond",
  "Surrey",
  "Vancouver",
  "West Vancouver",
  "White Rock",
] as const;

export type City = (typeof CITIES)[number];

export const LAWN_SIZES: { value: LawnSize; label: string; hint: string }[] = [
  { value: "small", label: "Small", hint: "up to 1,000 sq ft — half a day" },
  { value: "medium", label: "Medium", hint: "1,000–3,000 sq ft — half a day" },
  { value: "large", label: "Large", hint: "3,000–6,000 sq ft — a full day" },
  {
    value: "extra_large",
    label: "Extra large",
    hint: "6,000+ sq ft — a full day",
  },
];

export const TIME_SLOTS: { value: TimeSlot; label: string }[] = [
  { value: 'morning', label: 'Morning (8:00–12:00)' },
  { value: 'afternoon', label: 'Afternoon (13:00–17:00)' },
  { value: 'full_day', label: 'Full day (8:00–17:00)' },
]

export const STATUSES: { value: BookingStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancel" },
];

// Small helpers so the UI can display something more human-readable
export function lawnSizeLabel(value: string) {
  return LAWN_SIZES.find((s) => s.value === value)?.label ?? value
}

export function timeSlotLabel(value: string) {
  return TIME_SLOTS.find((s) => s.value === value)?.label ?? value
}

export function statusLabel(value: string) {
  return STATUSES.find((s) => s.value === value)?.label ?? value
}
