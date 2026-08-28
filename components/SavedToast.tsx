"use client";

import { useEffect } from "react";
import { toast } from "sonner";

const MESSAGES: Record<string, string> = {
  updated: "Booking updated.",
  confirmed: "Booking confirmed.",
  completed: "Booking marked completed.",
  cancelled: "Booking cancelled.",
};

export default function SavedToast({ saved }: { saved?: string }) {
  useEffect(() => {
    if (!saved || !MESSAGES[saved]) return;
    toast.success(MESSAGES[saved]);
    const url = new URL(window.location.href);
    url.searchParams.delete("saved");
    const next = url.pathname + url.search + url.hash;
    window.history.replaceState(null, "", next);
  }, [saved]);

  return null;
}
