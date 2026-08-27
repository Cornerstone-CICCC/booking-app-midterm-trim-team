"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { lawnSizeLabel, timeSlotLabel, type Booking } from "@/lib/types";

// One booking in the staff dashboard.

function rowAccent(status: string) {
  if (status === "pending") return "border-l-amber-400";
  if (status === "confirmed") return "border-l-green-600";
  if (status === "completed") return "border-l-blue-400";
  if (status === "cancelled") return "border-l-red-400";
  return "border-l-transparent";
}

export function BookingCard({ booking }: { booking: Booking }) {
  const href = `/dashboard/${booking.id}`;
  const where = `${booking.street_address}, ${booking.city}`;

  return (
    <Link
      href={href}
      className={`flex gap-3 items-start border-l-4 ${rowAccent(booking.status)} bg-white px-3 py-3 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{timeSlotLabel(booking.time_slot)}</p>
          <StatusBadge status={booking.status} className="shrink-0" />
        </div>
        <p className="mt-1 text-sm font-medium text-gray-900 truncate">{booking.full_name}</p>
        <p className="text-sm text-gray-600 truncate">{where}</p>
        <p className="text-sm text-gray-500">
          {booking.phone} · {lawnSizeLabel(booking.lawn_size)}
        </p>
      </div>
    </Link>
  );
}

export default function BookingRow({ booking }: { booking: Booking }) {
  const router = useRouter();
  const href = `/dashboard/${booking.id}`;
  const where = `${booking.street_address}, ${booking.city}`;

  return (
    <tr
      tabIndex={0}
      className="cursor-pointer bg-white hover:bg-gray-50"
      onClick={() => router.push(href)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(href);
        }
      }}
    >
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
      <td className="px-4 py-2.5 align-middle text-right whitespace-nowrap">
        <span className="text-sm text-gray-500">Details</span>
      </td>
    </tr>
  );
}
