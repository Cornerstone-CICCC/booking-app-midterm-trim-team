"use server";

import { sql } from "@/lib/db";

export async function createBooking(formData: {
  city: string;
  streetAddress: string;
  lawnSize: string;
  fullName: string;
  email: string;
  phone: string;
  serviceDate: string;
  timeSlot: string;
  note?: string;
}) {
  try {
    console.log("Server Action received data:", formData);

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
        ${formData.streetAddress},
        ${formData.lawnSize},
        ${formData.fullName},
        ${formData.email},
        ${formData.phone},
        ${formData.serviceDate},
        ${formData.timeSlot},
        ${formData.note || null},
        'pending'
      )
    `;
    return { success: true };
  } catch (error: any) {
    console.error("Detailed DB Insert Error Message:", error?.message);
    let errorMessage = "Database insertion failed";
    if (error?.message?.includes("bookings_one_per_slot")) {
      errorMessage = "An appointment already exists for this date and time slot. Please choose another slot.";
    } else if (error?.message) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

export async function getBookedSlotsByDate(serviceDate: string) {
  try {
    const result = await sql`
      SELECT time_slot 
      FROM bookings 
      WHERE service_date = ${serviceDate} 
        AND status != 'cancelled'
    `;
    
    const bookedSet = new Set(result.map((row) => row.time_slot));

    const availability = {
      morning: bookedSet.has("morning"),
      afternoon: bookedSet.has("afternoon"),
      full_day: bookedSet.has("full_day"),
    };

    return { success: true, availability };
  } catch (error: any) {
    console.error("Failed to fetch booked slots:", error?.message);
    return { 
      success: false, 
      availability: { morning: false, afternoon: false, full_day: false } 
    };
  }
}