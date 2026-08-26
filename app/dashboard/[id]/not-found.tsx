import Link from "next/link";

export default function BookingNotFound() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Booking not found</h1>
      <p className="text-sm text-gray-600 mb-4">This booking does not exist.</p>
      <Link href="/dashboard" className="text-sm underline">
        Back to bookings
      </Link>
    </div>
  );
}
