import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="max-w-3xl mx-auto">
      <p className="mb-5">
        <Link href="/dashboard" className="text-sm font-medium text-green-800 hover:underline">
          ← Back to bookings
        </Link>
      </p>

      <div className="w-fit mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Booking</h1>
        <div className="h-1 bg-green-700 rounded-full mt-2" />
      </div>

      <div className="border border-gray-200 rounded-2xl shadow-sm bg-white px-6 sm:px-8 py-8">
        <p className="text-lg text-gray-900">This booking does not exist.</p>
        <p className="mt-3 text-base leading-relaxed text-gray-500">
          It may have been removed, or the link is wrong.
        </p>
      </div>
    </div>
  );
}
