import Link from "next/link";

export default function BookingNotFound() {
  return (
    <div className="max-w-3xl mx-auto">
      <p className="mb-5">
        <Link href="/dashboard" className="text-sm font-medium text-green-800 hover:underline">
          ← Back to bookings
        </Link>
      </p>
      <div className="w-fit mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Booking not found</h1>
        <div className="h-1 bg-green-700 rounded-full mt-2" />
      </div>
      <div className="border border-gray-200 rounded-2xl px-6 py-10 text-sm text-gray-600 bg-white shadow-sm">
        This booking does not exist.
      </div>
    </div>
  );
}
