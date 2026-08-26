import type { Booking } from "./types";

const STORAGE_KEY = "trim_team_booking_draft";

export type BookingDraft = Partial<
  Pick<
    Booking,
    | "city"
    | "street_address"
    | "lawn_size"
    | "full_name"
    | "email"
    | "phone"
    | "service_date"
    | "time_slot"
  >
>;

export function getDraft(): BookingDraft {
  if (typeof window === "undefined") return {};

  try {
    const draft = localStorage.getItem(STORAGE_KEY);
    return draft ? JSON.parse(draft) : {};
  } catch {
    return {};
  }
}

export function saveDraft(draft: BookingDraft): BookingDraft {
  if (typeof window === "undefined") return {};

  try {
    const updatedDraft = { ...getDraft(), ...draft };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDraft));
    return updatedDraft;
  } catch {
    return {};
  }
}

export function clearDraft(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}
