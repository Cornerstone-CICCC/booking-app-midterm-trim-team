"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import { toast } from "sonner";

import { createBooking } from "@/app/actions/booking";
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

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!serviceDate || !timeSlot) {
      toast.error("Please select a service date and a time slot.");
      return;
    }

    const draft = saveDraft({
      service_date: serviceDate,
      time_slot: timeSlot,
    });

    if (
      !draft.city ||
      !draft.street_address ||
      !draft.lawn_size ||
      !draft.full_name ||
      !draft.email ||
      !draft.phone
    ) {
      toast.error("Please complete all booking steps before submitting.");
      return;
    }

    const result = await createBooking({
      city: draft.city,
      street_address: draft.street_address,
      lawn_size: draft.lawn_size,
      full_name: draft.full_name,
      email: draft.email,
      phone: draft.phone,
      service_date: serviceDate,
      time_slot: timeSlot,
    });

    if (result.success) {
      clearDraft();
      toast.success("Booking completed successfully!");
      router.push("/");
      return;
    }

    toast.error(result.error);
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
