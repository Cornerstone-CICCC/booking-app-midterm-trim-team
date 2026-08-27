import { sql } from '@/lib/db'
import { formatDate } from '@/lib/format'
import { Booking, lawnSizeLabel, timeSlotLabel } from '@/lib/types'
import Link from 'next/link'
import { searchDB } from './actions/dbComm'

let bookings = (await sql`
      select
        id, city, street_address, lawn_size, full_name, email, phone,
        to_char(service_date, 'YYYY-MM-DD') as service_date,
        time_slot, status, note, created_at, updated_at
      from bookings
      where email = 'x'
      order by service_date asc, time_slot asc
    `) as Booking[]

export default async function HomePage() {
  async function search(formData: FormData) {
    'use server'
    bookings = await searchDB(formData.get('email')?.toString() || '')
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-2">Trim Team</h1>

        <Link
          href="/step1"
          className="inline-block bg-green-700 text-white rounded px-5 py-3"
        >
          Book a service
        </Link>
      </div>
      <div>
        <form action={search}>
          <input type="text" placeholder="Search you bookings" name="email" />
          <button className="text-xs border border-red-600 text-red-600 rounded px-2 py-1">
            Search
          </button>
        </form>

        <ul className="divide-y divide-gray-200 border border-gray-200 rounded">
          {bookings.map((booking) => (
            <li key={booking.id} className="p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {booking.full_name} · {lawnSizeLabel(booking.lawn_size)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(booking.service_date)} ·{' '}
                    {timeSlotLabel(booking.time_slot)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {booking.street_address}, {booking.city}
                  </p>
                  {booking.note && (
                    <p className="text-sm text-gray-500 mt-1">
                      Note: {booking.note}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
