"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TIME_SLOTS, type TimeSlot } from "@/lib/types";
import { getDraft, saveDraft } from "@/lib/storage";
import StepHeader from "@/components/StepHeader";
import TextField from "@/components/TextField";
import RadioCardGroup from "@/components/RadioCardGroup";
import StepNav from "@/components/StepNav";

export default function Step3Page() {
  const router = useRouter();

  const [serviceDate, setServiceDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<TimeSlot>(TIME_SLOTS[0].value);

  // Restore previously entered values when the user comes back to this step.
  // One-time sync from localStorage into state (see step 1 for the rationale).
  useEffect(() => {
    const draft = getDraft();
    /* eslint-disable react-hooks/set-state-in-effect */
    if (draft.service_date) setServiceDate(draft.service_date);
    if (draft.time_slot) setTimeSlot(draft.time_slot);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceDate) {
      alert("Please select a service date.");
      return;
    }

    saveDraft({ service_date: serviceDate, time_slot: timeSlot });
    // TODO: submit the completed draft with a server action (createBooking),
    // then clearDraft() on success.
    router.push("/success");
  };

  return (
    <div className="max-w-xl mx-auto">
      <StepHeader
        step={3}
        title="When should we come?"
        subtitle="Choose your preferred date and time slot for the lawn service."
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
      >
        <TextField
          label="Service Date"
          name="service_date"
          type="date"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
          required
        />

        <RadioCardGroup
          label="Time Slot"
          name="time_slot"
          value={timeSlot}
          onChange={setTimeSlot}
          options={TIME_SLOTS}
        />

        <StepNav onBack={() => router.push("/step2")} nextLabel="Complete Booking →" />
      </form>
    </div>
  );
}
