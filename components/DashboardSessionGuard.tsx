"use client";

import { useEffect } from "react";

// After Sign out, the browser back button can restore a cached dashboard
// page without asking the server. Reload so proxy / layout can send us to login.

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
