"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

import RadioCardGroup from "@/components/RadioCardGroup";
import SelectField from "@/components/SelectField";
import StepHeader from "@/components/StepHeader";
import StepNav from "@/components/StepNav";
import TextField from "@/components/TextField";
import { getDraft, saveDraft } from "@/lib/storage";
import { CITIES, LAWN_SIZES, type City, type LawnSize } from "@/lib/types";

export default function Step1Page() {
  const router = useRouter();
  const currentDraft = getDraft();

  const [city, setCity] = useState<City>(
    (currentDraft.city as City) ?? CITIES[0],
  );
  const [streetAddress, setStreetAddress] = useState(
    currentDraft.street_address ?? "",
  );
  const [lawnSize, setLawnSize] = useState<LawnSize>(
    currentDraft.lawn_size ?? LAWN_SIZES[0].value,
  );

  const handleNext = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!streetAddress.trim()) {
      alert("Please enter your street address.");
      return;
    }

    saveDraft({
      city,
      street_address: streetAddress.trim(),
      lawn_size: lawnSize,
    });

    router.push("/step2");
  };

  return (
    <div className="max-w-xl mx-auto">
      <StepHeader
        step={1}
        title="Where is your lawn located?"
        subtitle="Select your city, enter your address, and choose your lawn size."
      />

      <form
        onSubmit={handleNext}
        className="space-y-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
      >
        <SelectField
          label="City"
          name="city"
          value={city}
          onChange={setCity}
          options={CITIES}
        />

        <TextField
          label="Street Address"
          name="street_address"
          type="text"
          placeholder="e.g. 1234 Robson St"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          required
        />

        <RadioCardGroup
          label="Lawn Size"
          name="lawn_size"
          value={lawnSize}
          onChange={setLawnSize}
          options={LAWN_SIZES}
        />

        <StepNav />
      </form>
    </div>
  );
}
