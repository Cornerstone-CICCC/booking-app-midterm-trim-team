"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import { toast } from "sonner";

import DateField from "@/components/DateField";
import RadioCardGroup from "@/components/RadioCardGroup";
import StepHeader from "@/components/StepHeader";
import StepNav from "@/components/StepNav";
import { clearDraft, getDraft, saveDraft } from "@/lib/storage";
import { TIME_SLOTS, type TimeSlot } from "@/lib/types";

export default function Step3Page() {
  const router = useRouter();
  const currentDraft = getDraft();

  const [serviceDate, setServiceDate] = useState(
    currentDraft.service_date ?? "",
  );
  const [timeSlot, setTimeSlot] = useState<TimeSlot>(
    (currentDraft.time_slot as TimeSlot) ?? TIME_SLOTS[0].value,
  );

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!serviceDate) {
      toast.error("Please select a service date.");
      return;
    }

    saveDraft({ service_date: serviceDate, time_slot: timeSlot });
    clearDraft();
    // TODO: submit the completed draft with a server action (createBooking),
    // then clearDraft() on success.
    router.push("/");
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
        <DateField
          label="Service Date"
          value={serviceDate}
          onChange={setServiceDate}
        />

        <RadioCardGroup
          label="Time Slot"
          name="time_slot"
          value={timeSlot}
          onChange={setTimeSlot}
          options={TIME_SLOTS}
        />

        <StepNav
          onBack={() => router.push("/step2")}
          nextLabel="Complete Booking →"
        />
      </form>
    </div>
  );
}
