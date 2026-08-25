import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { sql } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { lawnSizeLabel, timeSlotLabel, type Booking } from "@/lib/types";

// The staff dashboard: every booking, filterable, with confirm/cancel buttons.

export default async function DashboardPage() {
  const bookings = (await sql`
    select
      id, city, street_address, lawn_size, full_name, email, phone,
      to_char(service_date, 'YYYY-MM-DD') as service_date,
      time_slot, status, note, created_at, updated_at
    from bookings
    order by service_date asc, time_slot asc
  `) as Booking[];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Bookings</h1>
      <p className="text-sm text-gray-600 mb-4">
        All lawn-care jobs. Open a row to see contact details and notes.
      </p>

      {/* // TO-DO: Add search filters */}

      <p className="text-sm text-gray-600 mb-2">{bookings.length} booking(s)</p>

      {bookings.length === 0 ? (
        <p className="text-sm text-gray-500 mt-3">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium">Customer</th>
                <th className="px-3 py-2 font-medium">Location</th>
                <th className="px-3 py-2 font-medium">Size</th>
                <th className="px-3 py-2 font-medium">Time</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-3 py-2 whitespace-nowrap">{formatDate(booking.service_date)}</td>
                  <td className="px-3 py-2 font-medium whitespace-nowrap">{booking.full_name}</td>
                  <td className="px-3 py-2">
                    {booking.street_address}, {booking.city}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{lawnSizeLabel(booking.lawn_size)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{timeSlotLabel(booking.time_slot)}</td>
                  <td className="px-3 py-2">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/dashboard/${booking.id}`}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        View Details
                      </Link>
                      {booking.status !== "confirmed" && (
                        // TO-DO: Add action to confirm booking
                        <button className="text-xs border border-green-700 text-green-700 rounded px-2 py-1">
                          Confirm
                        </button>
                      )}
                      {booking.status !== "cancelled" && (
                        // TO-DO: Add action to cancel booking
                        <button className="text-xs border border-red-600 text-red-600 rounded px-2 py-1">
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
