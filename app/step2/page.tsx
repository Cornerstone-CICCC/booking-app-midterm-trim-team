"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

import StepHeader from "@/components/StepHeader";
import StepNav from "@/components/StepNav";
import TextField from "@/components/TextField";
import { getDraft, saveDraft } from "@/lib/storage";

export default function Step2Page() {
  const router = useRouter();
  const currentDraft = getDraft();

  const [fullName, setFullName] = useState(currentDraft.full_name ?? "");
  const [email, setEmail] = useState(currentDraft.email ?? "");
  const [phone, setPhone] = useState(currentDraft.phone ?? "");

  const handleNext = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill in all customer information fields.");
      return;
    }

    saveDraft({
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });

    router.push("/step3");
  };

  return (
    <div className="max-w-xl mx-auto">
      <StepHeader
        step={2}
        title="Tell us about yourself"
        subtitle="Please provide your contact details so we can reach you about your service."
      />

      <form
        onSubmit={handleNext}
        className="space-y-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
      >
        <TextField
          label="Full Name"
          name="full_name"
          type="text"
          placeholder="e.g. John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="e.g. john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="e.g. 6045551234"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <StepNav onBack={() => router.push("/step1")} />
      </form>
    </div>
  );
}
