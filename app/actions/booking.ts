"use server";

import { sql } from "@/lib/db";
import type { Booking, TimeSlot } from "@/lib/types";

export type CreateBookingInput = {
  city: string;
  street_address: string;
  lawn_size: string;
  full_name: string;
  email: string;
  phone: string;
  service_date: string;
  time_slot: TimeSlot;
  note?: string | null;
};

export type CreateBookingResult = { success: true } | { success: false; error: string };

export type SlotAvailability = {
  morning: boolean;
  afternoon: boolean;
  full_day: boolean;
};

export async function createBooking(formData: CreateBookingInput): Promise<CreateBookingResult> {
  try {
    await sql`
      INSERT INTO bookings (
        city,
        street_address,
        lawn_size,
        full_name,
        email,
        phone,
        service_date,
        time_slot,
        note,
        status
      ) VALUES (
        ${formData.city},
        ${formData.street_address},
        ${formData.lawn_size},
        ${formData.full_name},
        ${formData.email},
        ${formData.phone},
        ${formData.service_date},
        ${formData.time_slot},
        ${formData.note || null},
        'pending'
      )
    `;
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : undefined;
    console.error("Detailed DB Insert Error Message:", message);

    // TO-DO: Not sure if the db will throw this error if the slot is already booked.
    if (message?.includes("bookings_one_per_slot")) {
      return {
        success: false,
        error:
          "An appointment already exists for this date and time slot. Please choose another slot.",
      };
    }

    return {
      success: false,
      error: message ?? "Database insertion failed",
    };
  }
}

export async function getBookedSlotsByDate(serviceDate: string): Promise<{
  success: boolean;
  availability: SlotAvailability;
}> {
  const emptyAvailability: SlotAvailability = {
    morning: false,
    afternoon: false,
    full_day: false,
  };

  try {
    const result = await sql`
      SELECT time_slot
      FROM bookings
      WHERE service_date = ${serviceDate}
        AND status != 'cancelled'
    `;

    const bookedSet = new Set(result.map((row) => row.time_slot as string));

    return {
      success: true,
      availability: {
        morning: bookedSet.has("morning"),
        afternoon: bookedSet.has("afternoon"),
        full_day: bookedSet.has("full_day"),
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : undefined;
    console.error("Failed to fetch booked slots:", message);
    return { success: false, availability: emptyAvailability };
  }
}
