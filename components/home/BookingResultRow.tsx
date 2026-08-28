import StatusBadge from "@/components/StatusBadge";
import { formatDate } from "@/lib/format";
import { lawnSizeLabel, timeSlotLabel, type Booking } from "@/lib/types";

export default function BookingResultRow({ booking }: { booking: Booking }) {
  return (
    <li className="flex items-start justify-between gap-3 p-3">
      <div>
        <p className="font-medium text-gray-900">
          {formatDate(booking.service_date)} · {timeSlotLabel(booking.time_slot)}
        </p>
        <p className="text-sm text-gray-600">
          {booking.street_address}, {booking.city} · {lawnSizeLabel(booking.lawn_size)}
        </p>
      </div>
      <StatusBadge status={booking.status} />
    </li>
  );
}
