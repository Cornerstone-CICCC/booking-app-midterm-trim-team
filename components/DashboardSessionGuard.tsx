"use client";

import { useEffect } from "react";

// Reload if the back button restores a cached dashboard page after logout.

export default function DashboardSessionGuard() {
  useEffect(() => {
    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) window.location.reload();
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
