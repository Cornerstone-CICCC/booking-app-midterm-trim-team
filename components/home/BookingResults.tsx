import { sql } from "@/lib/db";
import { type Booking } from "@/lib/types";
import BookingResultRow from "./BookingResultRow";

// Async server component: fetches the bookings for `email` and renders them.
// The fetch lives here (inside the <Suspense> boundary in page.tsx) so the
// loading fallback can show while the query is in flight.

export default async function BookingResults({ email }: { email: string }) {
  const bookings = (await sql`
    select
      id, city, street_address, lawn_size, full_name, email, phone,
      to_char(service_date, 'YYYY-MM-DD') as service_date,
      time_slot, status, note, created_at, updated_at
    from bookings
    where lower(email) = ${email.toLowerCase()}
    order by service_date asc, time_slot asc
  `) as Booking[];

  if (bookings.length === 0) {
    return (
      <p className="mt-5 text-sm text-gray-500">
        No bookings found for <span className="font-medium">{email}</span>.
      </p>
    );
  }

  return (
    <ul className="mt-5 divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-100">
      {bookings.map((booking) => (
        <BookingResultRow key={booking.id} booking={booking} />
      ))}
    </ul>
  );
}
