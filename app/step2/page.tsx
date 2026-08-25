"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Step2Page() {
  const router = useRouter();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in all customer information fields.");
      return;
    }

    console.log({ fullName, email, phone });
    router.push("/step3");
  };

  const handleBack = () => {
    router.push("/step1");
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-4">
      <div className="mb-4">
        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
          Step 2 of 3
        </span>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">
          Tell us about yourself
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Please provide your contact details so we can reach you about your service.
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="e.g. john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="e.g. 6045551234"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
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
            className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Next Step &rarr;
          </button>
        </div>
      </form>
    </main>
  );
}