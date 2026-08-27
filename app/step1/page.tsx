"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import RadioCardGroup from "@/components/RadioCardGroup";
import SelectField from "@/components/SelectField";
import StepHeader from "@/components/StepHeader";
import StepNav from "@/components/StepNav";
import TextField from "@/components/TextField";
import { getDraft, saveDraft } from "@/lib/storage";
import { CITIES, LAWN_SIZES, type City, type LawnSize } from "@/lib/types";

export default function Step1Page() {
  const router = useRouter();

  const [city, setCity] = useState<City | "">("");
  const [streetAddress, setStreetAddress] = useState("");
  const [lawnSize, setLawnSize] = useState<LawnSize | "">("");

  // 클라이언트가 마운트된 후에 localStorage(Draft) 데이터를 불러와서 하이드레이션 에러를 방지합니다.
  useEffect(() => {
    const currentDraft = getDraft();
    if (currentDraft.city) setCity(currentDraft.city as City);
    if (currentDraft.street_address) setStreetAddress(currentDraft.street_address);
    if (currentDraft.lawn_size) setLawnSize(currentDraft.lawn_size as LawnSize);
  }, []);

  const handleNext = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    if (!city) {
      toast.error("Please select a city.");
      return;
    }

    if (!streetAddress.trim()) {
      toast.error("Please enter your street address.");
      return;
    }

    if (!lawnSize) {
      toast.error("Please select a lawn size.");
      return;
    }

    saveDraft({
      city: city as City,
      street_address: streetAddress.trim(),
      lawn_size: lawnSize as LawnSize,
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