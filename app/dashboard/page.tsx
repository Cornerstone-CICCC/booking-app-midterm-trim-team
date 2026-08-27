import Link from 'next/link'
import StatusBadge from '@/components/StatusBadge'
import { sql } from '@/lib/db'
import { formatDate } from '@/lib/format'
import { lawnSizeLabel, timeSlotLabel, type Booking } from '@/lib/types'

export default async function DashboardPage() {
  const bookings = (await sql`
    select
      id, city, street_address, lawn_size, full_name, email, phone,
      to_char(service_date, 'YYYY-MM-DD') as service_date,
      time_slot, status, note, created_at, updated_at
    from bookings
    order by service_date asc, time_slot asc
  `) as Booking[]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      <p className="text-sm text-gray-600 mb-2">{bookings.length} booking(s)</p>

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
              <div className="flex flex-col gap-2">
                <StatusBadge status={booking.status} />
                {booking.status !== 'confirmed' && (
                  // TO-DO: Add action to confirm booking
                  <button className="text-xs border border-green-700 text-green-700 rounded px-2 py-1">
                    Confirm
                  </button>
                )}
                {booking.status !== 'cancelled' && (
                  // TO-DO: Add action to cancel booking
                  <button className="text-xs border border-red-600 text-red-600 rounded px-2 py-1">
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <Link
                href={`/dashboard/bookingsDetails/${booking.id}`}
                className="text-xs border border-gray-300 rounded px-2 py-1"
              >
                View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {bookings.length === 0 && (
        <p className="text-sm text-gray-500 mt-3">
          No bookings match these filters.
        </p>
      )}
    </div>
  )
}
