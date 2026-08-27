import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { lawnSizeLabel, timeSlotLabel, type Booking } from "@/lib/types";

function rowAccent(status: string) {
  if (status === "pending") return "border-l-amber-400";
  if (status === "confirmed") return "border-l-green-600";
  if (status === "completed") return "border-l-blue-400";
  if (status === "cancelled") return "border-l-red-400";
  return "border-l-transparent";
}

export function BookingCard({ booking }: { booking: Booking }) {
  const detailsHref = `/dashboard/${booking.id}`;
  const editHref = `/dashboard/bookingsDetails/${booking.id}`;
  const where = `${booking.street_address}, ${booking.city}`;

  return (
    <div className={`border-l-4 ${rowAccent(booking.status)} bg-white px-3 py-3`}>
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{timeSlotLabel(booking.time_slot)}</p>
          <StatusBadge status={booking.status} className="shrink-0" />
        </div>
        <p className="mt-1 text-sm font-medium text-gray-900 truncate">{booking.full_name}</p>
        <p className="text-sm text-gray-600 truncate">{where}</p>
        <p className="text-sm text-gray-500">
          {booking.phone} · {lawnSizeLabel(booking.lawn_size)}
        </p>
        <p className="mt-2 flex gap-6 text-sm">
          <Link href={editHref} className="text-gray-500 hover:text-gray-900">
            Edit
          </Link>
          <Link href={detailsHref} className="text-gray-500 hover:text-gray-900">
            Details
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function BookingRow({ booking }: { booking: Booking }) {
  const detailsHref = `/dashboard/${booking.id}`;
  const editHref = `/dashboard/bookingsDetails/${booking.id}`;
  const where = `${booking.street_address}, ${booking.city}`;

  return (
    <tr className="bg-white">
      <td className={`px-4 py-2.5 align-middle whitespace-nowrap border-l-4 ${rowAccent(booking.status)}`}>
        {timeSlotLabel(booking.time_slot)}
      </td>
      <td className="px-4 py-2.5 align-middle">
        <StatusBadge status={booking.status} />
      </td>
      <td className="px-4 py-2.5 align-middle">
        <p className="font-medium text-gray-900">{booking.full_name}</p>
        <p className="text-gray-500 mt-0.5">{booking.phone}</p>
      </td>
      <td className="px-4 py-2.5 align-middle">
        <p className="text-gray-900 wrap-break-word" title={where}>
          {where}
        </p>
        <p className="text-gray-500 mt-0.5">{lawnSizeLabel(booking.lawn_size)}</p>
      </td>
      <td className="px-4 py-2.5 align-middle whitespace-nowrap">
        <Link href={editHref} className="text-sm text-gray-500 hover:text-gray-900">
          Edit
        </Link>
      </td>
      <td className="px-4 py-2.5 align-middle whitespace-nowrap">
        <Link href={detailsHref} className="text-sm text-gray-500 hover:text-gray-900">
          Details
        </Link>
      </td>
    </tr>
  );
}
