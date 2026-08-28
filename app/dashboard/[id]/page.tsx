import Link from "next/link";
import { notFound } from "next/navigation";
import SavedToast from "@/components/SavedToast";
import StatusBadge from "@/components/StatusBadge";
import { sql } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { isEditableStatus, lawnSizeLabel, timeSlotLabel, type Booking } from "@/lib/types";

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-y-0.5 py-3 border-b border-gray-100 last:border-b-0 sm:grid-cols-[6.75rem_1fr] sm:gap-x-6 sm:items-baseline">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-900 wrap-break-word">{children}</dd>
    </div>
  );
}

function railClasses(status: string) {
  if (status === "pending") return { wrap: "bg-amber-50 border-amber-100", card: "border-amber-100" };
  if (status === "completed") return { wrap: "bg-blue-50 border-blue-100", card: "border-blue-100" };
  if (status === "cancelled") return { wrap: "bg-red-50 border-red-100", card: "border-red-100" };
  return { wrap: "bg-green-50 border-green-100", card: "border-green-100" };
}

export default async function BookingDetailPage({ params, searchParams }: PageProps<"/dashboard/[id]">) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  const { saved: savedParam } = await searchParams;
  const saved = Array.isArray(savedParam) ? savedParam[0] : savedParam;

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

  const rail = railClasses(booking.status);

  return (
    <div className="max-w-3xl mx-auto">
      <SavedToast saved={saved} />
      <p className="mb-5">
        <Link href="/dashboard" className="text-sm font-medium text-green-800 hover:underline">
          ← Back to bookings
        </Link>
      </p>

      <div className="w-fit mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Booking</h1>
        <div className="h-1 bg-green-700 rounded-full mt-2" />
      </div>

      <div className="flex flex-col md:flex-row md:items-stretch border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="min-w-0 flex-1 px-4 sm:px-6 py-5">
          <dl>
            <Info label="Client name">{booking.full_name}</Info>
            <Info label="email">
              <a href={`mailto:${booking.email}`} className="hover:underline break-all">
                {booking.email}
              </a>
            </Info>
            <Info label="Phone">
              <a href={`tel:${booking.phone}`} className="hover:underline">
                {booking.phone}
              </a>
            </Info>
            <Info label="Lawn size">{lawnSizeLabel(booking.lawn_size)}</Info>
            <Info label="Date/Time">
              <span className="block">{formatDate(booking.service_date)}</span>
              <span className="text-gray-500">{timeSlotLabel(booking.time_slot)}</span>
            </Info>
            <Info label="Address">
              {booking.street_address}, {booking.city}
            </Info>
            <Info label="Note">
              {booking.note ? booking.note : <span className="font-normal text-gray-400">None</span>}
            </Info>
          </dl>
        </div>

        <aside className={`flex flex-col gap-4 shrink-0 md:w-52 px-4 py-5 border-t md:border-t-0 md:border-l ${rail.wrap}`}>
          <div className={`rounded bg-white px-3 py-3 border ${rail.card}`}>
            <p className="text-xs text-gray-500 mb-2">Status</p>
            <StatusBadge status={booking.status} className="block w-full text-sm py-1.5 text-center" />
          </div>

          <div className="md:mt-auto">
            {isEditableStatus(booking.status) && (
              <Link
                href={`/dashboard/${booking.id}/edit`}
                className="block w-full text-sm text-center bg-green-50 text-green-800 border border-green-700 rounded px-3 py-2 hover:bg-green-100"
              >
                Edit
              </Link>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
