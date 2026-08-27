// Loading placeholder shown by <Suspense> while BookingResults is fetching.

export default function BookingResultsSkeleton() {
  return (
    <ul className="mt-5 divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-100">
      {[0, 1, 2].map((i) => (
        <li key={i} className="flex items-center justify-between gap-3 p-3">
          <div className="w-full space-y-2">
            <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-56 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200" />
        </li>
      ))}
    </ul>
  );
}
