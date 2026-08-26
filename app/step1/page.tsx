"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CITIES, LAWN_SIZES } from "@/lib/types";

export default function Step1Page() {
  const router = useRouter();
  
  const [city, setCity] = useState(CITIES[0]);
  const [streetAddress, setStreetAddress] = useState("");
  const [lawnSize, setLawnSize] = useState(LAWN_SIZES[0].value);

  useEffect(() => {
    localStorage.removeItem("bookingData");
  }, []);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streetAddress.trim()) {
      alert("Please enter your street address.");
      return;
    }

    const currentData = JSON.parse(localStorage.getItem("bookingData") || "{}");
    localStorage.setItem(
      "bookingData",
      JSON.stringify({ ...currentData, city, streetAddress, lawnSize })
    );

    router.push("/step2");
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-4">
      <div className="mb-4">
        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          Step 1 of 3
        </span>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">
          Where is your lawn located?
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Select your city, enter your address, and choose your lawn size.
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            type="text"
            placeholder="e.g. 1234 Robson St"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lawn Size
          </label>
          <div className="grid grid-cols-1 gap-2">
            {LAWN_SIZES.map((size) => (
              <label
                key={size.value}
                className={`flex items-start p-2.5 border rounded-lg cursor-pointer transition-all ${
                  lawnSize === size.value
                    ? "border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="lawn_size"
                  value={size.value}
                  checked={lawnSize === size.value}
                  onChange={() => setLawnSize(size.value)}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">
                    {size.label}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {size.hint}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Next Step &rarr;
          </button>
        </div>
      </form>
    </main>
  );
}