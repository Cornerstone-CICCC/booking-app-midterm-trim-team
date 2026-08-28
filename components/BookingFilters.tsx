"use client";

import { useRouter } from "next/navigation";
import { CITIES, LAWN_SIZES, STATUSES } from "@/lib/types";

const selectClass =
  "w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm bg-white focus:outline-none focus:border-green-700";

type Props = {
  status: string;
  city: string;
  lawnSize: string;
};

function hrefFor(status: string, city: string, lawnSize: string) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (city) params.set("city", city);
  if (lawnSize) params.set("lawn_size", lawnSize);
  const query = params.toString();
  return query ? `/dashboard?${query}` : "/dashboard";
}

export default function BookingFilters({ status, city, lawnSize }: Props) {
  const router = useRouter();
  const filtered = Boolean(status || city || lawnSize);

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
      <label className="min-w-0 flex-1">
        <span className="mb-1 block text-xs font-medium text-gray-500">Status</span>
        <select
          className={selectClass}
          value={status}
          onChange={(event) => router.push(hrefFor(event.target.value, city, lawnSize))}
        >
          <option value="">All</option>
          {STATUSES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <label className="min-w-0 flex-1">
        <span className="mb-1 block text-xs font-medium text-gray-500">City</span>
        <select
          className={selectClass}
          value={city}
          onChange={(event) => router.push(hrefFor(status, event.target.value, lawnSize))}
        >
          <option value="">All</option>
          {CITIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="min-w-0 flex-1">
        <span className="mb-1 block text-xs font-medium text-gray-500">Lawn size</span>
        <select
          className={selectClass}
          value={lawnSize}
          onChange={(event) => router.push(hrefFor(status, city, event.target.value))}
        >
          <option value="">All</option>
          {LAWN_SIZES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      {filtered && (
        <button
          type="button"
          className="shrink-0 text-sm font-medium text-green-800 hover:underline sm:mb-1.5"
          onClick={() => router.push("/dashboard")}
        >
          Clear
        </button>
      )}
    </div>
  );
}
