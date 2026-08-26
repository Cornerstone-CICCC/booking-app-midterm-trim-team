"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TIME_SLOTS } from "@/lib/types";
import { createBooking } from "../actions/booking";

export default function Step3Page() {
  const router = useRouter();
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split("T")[0];

  const [serviceDate, setServiceDate] = useState(defaultDate);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0].value);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("bookingData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.serviceDate) setServiceDate(parsed.serviceDate);
      if (parsed.timeSlot) setTimeSlot(parsed.timeSlot);
      if (parsed.note) setNote(parsed.note);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceDate) {
      alert("Please select a service date.");
      return;
    }

    const currentData = JSON.parse(localStorage.getItem("bookingData") || "{}");
    
    const finalPayload = {
      ...currentData,
      serviceDate,
      timeSlot,
      note,
    };

    setLoading(true);

    const result = await createBooking(finalPayload);

    if (result.success) {
      localStorage.removeItem("bookingData");
      alert("Booking completed successfully!");
      router.push("/");
    } else {
      alert(`Booking failed: ${result.error}`);
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/step2");
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-4">
      <div className="mb-4">
        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          Step 3 of 3
        </span>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">
          When should we come?
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Choose your preferred date and time slot for the lawn service.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Date
          </label>
          <input
            type="date"
            value={serviceDate}
            onChange={(e) => setServiceDate(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Slot
          </label>
          <div className="grid grid-cols-1 gap-2.5">
            {TIME_SLOTS.map((slot) => (
              <label
                key={slot.value}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  timeSlot === slot.value
                    ? "border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="time_slot"
                  value={slot.value}
                  checked={timeSlot === slot.value}
                  onChange={() => setTimeSlot(slot.value)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {slot.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Instructions / Note (Optional)
          </label>
          <textarea
            placeholder="e.g. Gate code 4455, big dog in backyard"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>

        <div className="pt-2 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            &larr; Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Complete Booking \u2192"}
          </button>
        </div>
      </form>
    </main>
  );
}