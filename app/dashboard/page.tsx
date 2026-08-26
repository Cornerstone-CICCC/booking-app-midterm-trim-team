import Link from "next/link";
import BookingRow, { BookingCard } from "@/components/BookingRow";
import { dateGroupLabel, todayInVancouver } from "@/lib/format";
import { sql } from "@/lib/db";
import { type Booking, type TimeSlot } from "@/lib/types";

// The staff dashboard: every booking, with a link to the detail page.

const SLOT_ORDER: Record<TimeSlot, number> = {
  morning: 1,
  afternoon: 2,
  full_day: 3,
};

function bySlot(a: Booking, b: Booking) {
  return (SLOT_ORDER[a.time_slot] ?? 9) - (SLOT_ORDER[b.time_slot] ?? 9);
}

function groupByDate(bookings: Booking[]) {
  const groups: { date: string; bookings: Booking[] }[] = [];
  for (const booking of bookings) {
    const last = groups.at(-1);
    if (last?.date === booking.service_date) last.bookings.push(booking);
    else groups.push({ date: booking.service_date, bookings: [booking] });
  }
  return groups;
}

function splitUpcomingAndPast(bookings: Booking[], today: string) {
  const upcoming = bookings
    .filter((booking) => booking.service_date >= today)
    .sort((a, b) => a.service_date.localeCompare(b.service_date) || bySlot(a, b));
  const past = bookings
    .filter((booking) => booking.service_date < today)
    .sort((a, b) => b.service_date.localeCompare(a.service_date) || bySlot(a, b));
  return { upcoming: groupByDate(upcoming), past: groupByDate(past) };
}

export default async function DashboardPage({ searchParams }: PageProps<"/dashboard">) {
  const { status } = await searchParams;
  const pendingOnly = status === "pending";

  const bookings = (await sql`
    select
      id, city, street_address, lawn_size, full_name, email, phone,
      to_char(service_date, 'YYYY-MM-DD') as service_date,
      time_slot, status, note, created_at, updated_at
    from bookings
    order by service_date asc, time_slot asc
  `) as Booking[];

  const pendingCount = bookings.filter((booking) => booking.status === "pending").length;
  const visible = pendingOnly ? bookings.filter((booking) => booking.status === "pending") : bookings;
  const today = todayInVancouver();
  const { upcoming, past } = splitUpcomingAndPast(visible, today);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <div className="w-fit">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Bookings</h1>
            <div className="h-1 bg-green-700 rounded-full mt-2 mb-3" />
          </div>
        </div>
        <p className="text-sm text-gray-500">
          {pendingCount === 0 ? (
            "Nothing pending"
          ) : pendingOnly ? (
            <>
              {pendingCount} need confirmation
              {" · "}
              <Link href="/dashboard" className="font-medium text-green-800 hover:underline">
                Show all
              </Link>
            </>
          ) : (
            <Link href="/dashboard?status=pending" className="font-medium text-green-800 hover:underline">
              {pendingCount} need confirmation
            </Link>
          )}
        </p>
      </div>

      {/* TO-DO: Add search filters */}

      {bookings.length === 0 ? (
        <div className="border border-gray-200 rounded-lg px-4 py-12 text-center text-sm text-gray-500 bg-white">
          No bookings yet.
        </div>
      ) : visible.length === 0 ? (
        <div className="border border-gray-200 rounded-lg px-4 py-12 text-center text-sm text-gray-500 bg-white">
          No pending bookings.
        </div>
      ) : (
        <>
          <div className="space-y-4 md:hidden">
            {upcoming.map((group) => (
              <DayList key={group.date} label={dateGroupLabel(group.date, today)} bookings={group.bookings} />
            ))}
            {past.length > 0 && (
              <div className="space-y-4 pt-2">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Past</p>
                {past.map((group) => (
                  <DayList key={group.date} label={dateGroupLabel(group.date, today)} bookings={group.bookings} />
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block border border-gray-200 rounded-lg overflow-hidden bg-white">
            <table className="w-full text-sm text-left table-fixed">
              <colgroup>
                <col className="w-54" />
                <col className="w-28" />
                <col className="w-[22%]" />
                <col />
                <col className="w-20" />
              </colgroup>
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">
                <tr>
                  <th className="px-4 py-2 border-l-4 border-transparent">Time</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Job</th>
                  <th className="px-4 py-2 text-right">Details</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((group, index) => (
                  <DayGroup
                    key={group.date}
                    label={dateGroupLabel(group.date, today)}
                    bookings={group.bookings}
                    first={index === 0}
                  />
                ))}
                {past.length > 0 && (
                  <>
                    <tr>
                      <th colSpan={5} className="px-4 pt-5 pb-1 text-left text-xs font-medium uppercase tracking-wide text-gray-400">
                        Past
                      </th>
                    </tr>
                    {past.map((group) => (
                      <DayGroup key={group.date} label={dateGroupLabel(group.date, today)} bookings={group.bookings} />
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function DayList({ label, bookings }: { label: string; bookings: Booking[] }) {
  return (
    <section className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <h2 className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b border-gray-200">{label}</h2>
      <div className="divide-y divide-gray-100">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </section>
  );
}

function DayGroup({
  label,
  bookings,
  first,
}: {
  label: string;
  bookings: Booking[];
  first?: boolean;
}) {
  return (
    <>
      <tr>
        <th
          colSpan={5}
          className={`px-4 py-2 text-left text-xs font-medium text-gray-500 bg-gray-50 ${first ? "" : "border-t border-gray-200"}`}
        >
          {label}
        </th>
      </tr>
      {bookings.map((booking) => (
        <BookingRow key={booking.id} booking={booking} />
      ))}
    </>
  );
}
