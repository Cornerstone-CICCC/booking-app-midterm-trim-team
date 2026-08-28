import Link from "next/link";
import BookingFilters from "@/components/BookingFilters";
import BookingRow, { BookingCard } from "@/components/BookingRow";
import { dateGroupLabel, todayInVancouver } from "@/lib/format";
import { sql } from "@/lib/db";
import { CITIES, LAWN_SIZES, STATUSES, type Booking, type TimeSlot } from "@/lib/types";

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function dashboardHref(status: string, city: string, lawnSize: string) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (city) params.set("city", city);
  if (lawnSize) params.set("lawn_size", lawnSize);
  const query = params.toString();
  return query ? `/dashboard?${query}` : "/dashboard";
}

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
  const raw = await searchParams;
  const statusFilter = STATUSES.some((item) => item.value === firstParam(raw.status))
    ? firstParam(raw.status)
    : "";
  const cityFilter = CITIES.includes(firstParam(raw.city) as (typeof CITIES)[number])
    ? firstParam(raw.city)
    : "";
  const lawnFilter = LAWN_SIZES.some((item) => item.value === firstParam(raw.lawn_size))
    ? firstParam(raw.lawn_size)
    : "";
  const pendingOnly = statusFilter === "pending";
  const hasFilters = Boolean(statusFilter || cityFilter || lawnFilter);

  const bookings = (await sql`
    select
      id, city, street_address, lawn_size, full_name, email, phone,
      to_char(service_date, 'YYYY-MM-DD') as service_date,
      time_slot, status, note, created_at, updated_at
    from bookings
    order by service_date asc, time_slot asc
  `) as Booking[];

  const pendingCount = bookings.filter((booking) => {
    if (booking.status !== "pending") return false;
    if (cityFilter && booking.city !== cityFilter) return false;
    if (lawnFilter && booking.lawn_size !== lawnFilter) return false;
    return true;
  }).length;
  const visible = bookings.filter((booking) => {
    if (statusFilter && booking.status !== statusFilter) return false;
    if (cityFilter && booking.city !== cityFilter) return false;
    if (lawnFilter && booking.lawn_size !== lawnFilter) return false;
    return true;
  });
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
        {pendingCount === 0 ? (
          <p className="text-sm text-gray-500">Nothing pending</p>
        ) : pendingOnly ? (
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1.5 font-medium text-yellow-800">
              {pendingCount} need confirmation
            </span>
            <Link href={dashboardHref("", cityFilter, lawnFilter)} className="font-medium text-green-800 hover:underline">
              Show all
            </Link>
          </p>
        ) : (
          <Link
            href={dashboardHref("pending", cityFilter, lawnFilter)}
            className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-200"
          >
            {pendingCount} need confirmation
          </Link>
        )}
      </div>

      <BookingFilters status={statusFilter} city={cityFilter} lawnSize={lawnFilter} />

      {bookings.length === 0 ? (
        <div className="border border-gray-200 rounded-lg px-4 py-12 text-center text-sm text-gray-500 bg-white">
          No bookings yet.
        </div>
      ) : visible.length === 0 ? (
        <div className="border border-gray-200 rounded-lg px-4 py-12 text-center text-sm text-gray-500 bg-white">
          {hasFilters ? "No bookings match these filters." : "No pending bookings."}
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
                <col className="w-16" />
                <col className="w-20" />
              </colgroup>
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">
                <tr>
                  <th className="px-4 py-2 border-l-4 border-transparent">Time</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Job</th>
                  <th className="px-4 py-2">Edit</th>
                  <th className="px-4 py-2">Details</th>
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
                      <th colSpan={6} className="px-4 pt-5 pb-1 text-left text-xs font-medium uppercase tracking-wide text-gray-400">
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
    <section>
      <h2 className="px-1 pb-2 text-xs font-medium text-gray-500">{label}</h2>
      <div className="space-y-2">
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
          colSpan={6}
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
