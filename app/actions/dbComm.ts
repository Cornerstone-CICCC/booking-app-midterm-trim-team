'use server'

import { sql } from '@/lib/db'
import { Booking } from '@/lib/types'
import { revalidatePath } from 'next/cache'

export async function bookingsDB(id: number) {
  const DBresult = (await sql`
    select
      id, city, street_address, lawn_size, full_name, email, phone,
      to_char(service_date, 'YYYY-MM-DD') as service_date,
      time_slot, status, note, created_at, updated_at
    from bookings
    where id = ${id}
  `) as Booking[]
  return DBresult[0]
}

export async function confirmDB(id: number) {
  await sql`UPDATE bookings
SET status = 'confirmed'
WHERE id= ${id};`
  revalidatePath(`/dashboard/bookingsDetails/${id}`)
}

export async function cancelDB(id: number) {
  await sql`UPDATE bookings
SET status = 'cancelled'
WHERE id= ${id};`
  revalidatePath(`/dashboard/bookingsDetails/${id}`)
}
export async function compleatedDB(id: number) {
  await sql`UPDATE bookings
SET status = 'completed'
WHERE id= ${id};`
  revalidatePath(`/dashboard/bookingsDetails/${id}`)
}

export async function pendingDB(id: number) {
  await sql`UPDATE bookings
SET status = 'pending'
WHERE id= ${id};`
  revalidatePath(`/dashboard/bookingsDetails/${id}`)
}

export async function updateDB(
  id: number,
  city: string,
  street_address: string,
  lawn_size: string,
  full_name: string,
  email: string,
  phone: string,
  service_date: Date,
  time_slot: string,
  note: string,
) {
  await sql`UPDATE bookings SET city = ${city}, street_address = ${street_address}, lawn_size = ${lawn_size}, full_name = ${full_name}, email = ${email}, phone = ${phone}, service_date = ${service_date}, time_slot = ${time_slot}, note = ${note}
WHERE id= ${id};`

  revalidatePath(`/dashboard/bookingsDetails/${id}`)
  return 1
}

export async function searchDB(email: string) {
  const today = new Date()

  console.log(today)
  const books = (await sql`
      select
        id, city, street_address, lawn_size, full_name, email, phone,
        to_char(service_date, 'YYYY-MM-DD') as service_date,
        time_slot, status, note, created_at, updated_at
      from bookings
     where email =${email} and service_date >= ${today}
      order by service_date asc, time_slot asc
    `) as Booking[]
  revalidatePath(`/`)
  return books
}
