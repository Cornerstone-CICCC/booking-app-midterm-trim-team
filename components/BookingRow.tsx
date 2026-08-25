import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { formatDate } from "@/lib/format";
import { lawnSizeLabel, timeSlotLabel, type Booking } from "@/lib/types";

// One booking in the staff dashboard table.

export default function BookingRow({ booking }: { booking: Booking }) {
  return (
    <tr>
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
  );
}
