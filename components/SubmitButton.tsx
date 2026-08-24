"use client";

import { useFormStatus } from "react-dom";

// A submit button that disables itself and says "Saving…" while the form's
// server action is running. useFormStatus() reads the state of the <form> it
// sits inside, which is why this has to be its own client component.

export default function SubmitButton({
  children,
  pendingLabel = "Saving…",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-green-700 text-white rounded px-4 py-2 disabled:opacity-50"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
