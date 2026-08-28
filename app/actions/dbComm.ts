"use server";

import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { getStaffUser } from "@/lib/auth";
import { Booking } from "@/lib/types";
import { revalidatePath } from "next/cache";

async function requireStaff() {
  const user = await getStaffUser();
  if (!user) redirect("/login");
}

function refreshBooking(id: number) {
  revalidatePath(`/dashboard/${id}/edit`);
  revalidatePath(`/dashboard/${id}`);
  revalidatePath("/dashboard");
}

export async function bookingsDB(id: number) {
  await requireStaff();
  const DBresult = (await sql`
    select
      id, city, street_address, lawn_size, full_name, email, phone,
      to_char(service_date, 'YYYY-MM-DD') as service_date,
      time_slot, status, note, created_at, updated_at
    from bookings
    where id = ${id}
  `) as Booking[];
  return DBresult[0];
}

export async function confirmDB(id: number) {
  await requireStaff();
  await sql`UPDATE bookings SET status = 'confirmed' WHERE id = ${id} AND status = 'pending'`;
  refreshBooking(id);
}

export async function cancelDB(id: number) {
  await requireStaff();
  await sql`UPDATE bookings SET status = 'cancelled' WHERE id = ${id} AND status IN ('pending', 'confirmed')`;
  refreshBooking(id);
}

export async function updateDB(
  id: number,
  city: string,
  street_address: string,
  lawn_size: string,
  full_name: string,
  email: string,
  phone: string,
  service_date: string,
  time_slot: string,
  note: string,
) {
  await requireStaff();
  await sql`UPDATE bookings SET city = ${city}, street_address = ${street_address}, lawn_size = ${lawn_size}, full_name = ${full_name}, email = ${email}, phone = ${phone}, service_date = ${service_date}, time_slot = ${time_slot}, note = ${note}
WHERE id = ${id} AND status IN ('pending', 'confirmed')`;
  refreshBooking(id);
  return 1;
}

export async function applyUpdate(id: number, formData: FormData, fallback: Booking) {
  const full_name = String(formData.get("full_name") ?? "") || fallback.full_name;
  const email = String(formData.get("email") ?? "") || fallback.email;
  const phone = String(formData.get("phone") ?? "") || fallback.phone;
  const lawn_size = String(formData.get("lawn_size") ?? "") || fallback.lawn_size;
  const note = String(formData.get("note") ?? "");
  const street = String(formData.get("street") ?? "") || fallback.street_address;
  const city = String(formData.get("city") ?? "") || fallback.city;
  const time_slot = String(formData.get("time_slot") ?? "") || fallback.time_slot;
  const service_date = String(formData.get("service_date") ?? "") || fallback.service_date;

  await updateDB(id, city, street, lawn_size, full_name, email, phone, service_date, time_slot, note);
}

export async function completedDB(id: number) {
  await requireStaff();
  await sql`UPDATE bookings SET status = 'completed' WHERE id = ${id} AND status = 'confirmed'`;
  refreshBooking(id);
}
