"use client";

import { SubmitEvent, useState, useTransition } from "react";
import { toast } from "sonner";

import { getBookingsByEmail } from "@/app/actions/booking";
import type { Booking } from "@/lib/types";
import BookingResultRow from "./BookingResultRow";
import BookingResultsSkeleton from "./BookingResultsSkeleton";

export default function BookingLookup() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{ email: string; bookings: Booking[] | null } | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) return;

    startTransition(async () => {
      const res = await getBookingsByEmail(trimmed);

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      setResult({ email: trimmed, bookings: res.bookings });
    });
  }

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">Check your booking</h2>
      <p className="mt-1 text-sm text-gray-600">
        Enter the email you booked with to see your booking.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full flex-1 rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
        >
          {isPending ? "Searching…" : "Search"}
        </button>
      </form>

      {isPending ? (
        <BookingResultsSkeleton />
      ) : result ? (
        result.bookings ? (
          <ul className="mt-5 divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-100">
            {result.bookings.map((booking) => (
              <BookingResultRow key={booking.id} booking={booking} />
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-sm text-gray-500">
            No booking found for <span className="font-medium">{result.email}</span>.
          </p>
        )
      ) : null}
    </section>
  );
}
