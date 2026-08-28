"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Field from "@/components/Field";
import { login, type LoginState } from "@/app/actions/auth";

function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full text-base bg-green-50 text-green-800 border border-green-700 rounded px-3 py-2.5 hover:bg-green-100 disabled:opacity-50"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, {} as LoginState);

  return (
    <div className="flex min-h-[calc(100dvh-10rem)] items-center justify-center">
      <div className="w-full max-w-md">
        <div className="w-fit mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Staff login</h1>
          <div className="h-1 bg-green-700 rounded-full mt-2" />
        </div>

        <div className="border border-gray-200 rounded-lg bg-white px-6 py-7">
          <form action={formAction}>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="username"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-base"
            />
            <Field
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-base"
            />
            {state.error && <p className="text-sm text-red-700 mb-4">{state.error}</p>}
            <SignInButton />
          </form>
        </div>
      </div>
    </div>
  );
}
