"use client";

import { useActionState } from "react";
import Field from "@/components/Field";
import SubmitButton from "@/components/SubmitButton";
import { login, type LoginState } from "@/app/actions/auth";

// This is the page that staff members use to sign in.
// Customers don't need an account to book.

export default function LoginPage() {
  const [state, formAction] = useActionState(login, {} as LoginState);

  return (
    <div className="max-w-sm">
      <h1 className="text-2xl font-bold mb-1">Staff login</h1>

      <form action={formAction}>
        <Field label="Email" name="email" type="email" autoComplete="username" />
        <Field label="Password" name="password" type="password" autoComplete="current-password" />
        {state.error && <p className="text-red-800 ">{state.error}</p>}
        <SubmitButton pendingLabel="Signing in…">Sign in</SubmitButton>
      </form>
    </div>
  );
}
