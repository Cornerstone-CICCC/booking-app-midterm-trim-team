"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import { createBooking, getBookedSlotsByDate, type BookedSlots } from "@/app/actions/booking";
import DateField from "@/components/DateField";
import RadioCardGroup from "@/components/RadioCardGroup";
import StepHeader from "@/components/StepHeader";
import StepNav from "@/components/StepNav";
import { clearDraft, getDraft, saveDraft } from "@/lib/storage";
import { TIME_SLOTS, type TimeSlot } from "@/lib/types";

const NO_BOOKED_SLOTS: BookedSlots = {
  morning: false,
  afternoon: false,
  full_day: false,
};

export default function Step3Page() {
  const router = useRouter();

  const [serviceDate, setServiceDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<TimeSlot | "">("");
  const [bookedSlots, setBookedSlots] = useState<BookedSlots>(NO_BOOKED_SLOTS);

  useEffect(() => {
    const currentDraft = getDraft();
    if (currentDraft.service_date) setServiceDate(currentDraft.service_date);
    if (currentDraft.time_slot) setTimeSlot(currentDraft.time_slot as TimeSlot);
  }, []);

  useEffect(() => {
    // If no date is selected, skip the fetch (UI disables all slots separately).
    if (!serviceDate) return;

    async function fetchBookedSlots() {
      const result = await getBookedSlotsByDate(serviceDate);
      setBookedSlots(result.bookedSlots);
    }

    fetchBookedSlots();
  }, [serviceDate]);

  // Determine disabled time slots based on existing bookings and conflict rules
  const disabledValues = !serviceDate
    ? new Set(TIME_SLOTS.map((slot) => slot.value))
    : (() => {
        const disabled = new Set<TimeSlot>();
        const isMorningBooked = bookedSlots.morning;
        const isAfternoonBooked = bookedSlots.afternoon;
        const isFullDayBooked = bookedSlots.full_day;

        if (isFullDayBooked) {
          disabled.add("morning");
          disabled.add("afternoon");
          disabled.add("full_day");
        }

        if (isMorningBooked || isAfternoonBooked) {
          disabled.add("full_day");
        }

        if (isMorningBooked) disabled.add("morning");
        if (isAfternoonBooked) disabled.add("afternoon");

        return disabled;
      })();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    if (!serviceDate) {
      toast.error("Please select a service date.");
      return;
    }

    if (!timeSlot) {
      toast.error("Please select a time slot.");
      return;
    }

    if (bookedSlots[timeSlot]) {
      toast.error("That time slot is already booked. Please choose another.");
      return;
    }

    if (timeSlot === "full_day" && (bookedSlots.morning || bookedSlots.afternoon)) {
      toast.error("Full day cannot be booked when morning or afternoon slots are already taken.");
      return;
    }

    if ((timeSlot === "morning" || timeSlot === "afternoon") && bookedSlots.full_day) {
      toast.error("Morning or afternoon slots cannot be booked when the full day is already taken.");
      return;
    }

    const draft = saveDraft({
      service_date: serviceDate,
      time_slot: timeSlot as TimeSlot,
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
      time_slot: timeSlot as TimeSlot,
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
        <DateField label="Service Date" value={serviceDate} onChange={setServiceDate} />

        <RadioCardGroup
          label="Time Slot"
          name="time_slot"
          value={timeSlot}
          onChange={setTimeSlot}
          options={TIME_SLOTS}
          disabledValues={disabledValues}
          disabledLabel={serviceDate ? "Already Booked" : "Select a date first"}
        />

        <StepNav onBack={() => router.push("/step2")} nextLabel="Complete Booking →" />
      </form>
    </div>
  );
}