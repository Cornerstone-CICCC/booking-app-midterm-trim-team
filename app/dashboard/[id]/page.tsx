import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { sql } from "@/lib/db";
import { formatDate, formatDateTime } from "@/lib/format";
import { lawnSizeLabel, timeSlotLabel, type Booking } from "@/lib/types";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-3 py-3">
      <dt className="text-sm text-gray-600">{label}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}

export default async function BookingDetailPage({ params }: PageProps<"/dashboard/[id]">) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isInteger(id) || id < 1) notFound();

  const rows = (await sql`
    select
      id, city, street_address, lawn_size, full_name, email, phone,
      to_char(service_date, 'YYYY-MM-DD') as service_date,
      time_slot, status, note, created_at, updated_at
    from bookings
    where id = ${id}
  `) as Booking[];

  const booking = rows[0];
  if (!booking) notFound();

  return (
    <div>
      <p className="mb-4">
        <Link href="/dashboard" className="text-sm underline">
          Back to bookings
        </Link>
      </p>

      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-bold">{booking.full_name}</h1>
          <p className="text-sm text-gray-600">Booking #{booking.id}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <dl className="divide-y divide-gray-200 border border-gray-200 rounded">
        <Row label="Email">{booking.email}</Row>
        <Row label="Phone">{booking.phone}</Row>
        <Row label="Address">
          {booking.street_address}, {booking.city}
        </Row>
        <Row label="Lawn size">{lawnSizeLabel(booking.lawn_size)}</Row>
        <Row label="Service date">{formatDate(booking.service_date)}</Row>
        <Row label="Time slot">{timeSlotLabel(booking.time_slot)}</Row>
        <Row label="Note">{booking.note || "None"}</Row>
        <Row label="Created">{formatDateTime(booking.created_at)}</Row>
        <Row label="Updated">{formatDateTime(booking.updated_at)}</Row>
      </dl>
    </div>
  );
}
