"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import StepHeader from "@/components/StepHeader";
import StepNav from "@/components/StepNav";
import TextField from "@/components/TextField";
import { getDraft, saveDraft } from "@/lib/storage";

export default function Step2Page() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const currentDraft = getDraft();
    if (currentDraft.full_name) setFullName(currentDraft.full_name);
    if (currentDraft.email) setEmail(currentDraft.email);
    if (currentDraft.phone) setPhone(currentDraft.phone);
  }, []);

  const handleNext = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    if (!fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    const currentDraft = getDraft();
    saveDraft({
      ...currentDraft,
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
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="e.g. john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="e.g. 6045551234"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <StepNav onBack={() => router.push("/step1")} />
      </form>
    </div>
  );
}