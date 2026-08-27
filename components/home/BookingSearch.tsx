// Email lookup form. Plain GET form → submits to "/?email=...", so no client
// JS is needed. `email` seeds the input after a search (defaultValue).

export default function BookingSearch({ email }: { email: string }) {
  return (
    <form method="get" className="mt-4 flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        name="email"
        defaultValue={email}
        required
        placeholder="you@example.com"
        className="w-full flex-1 rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        type="submit"
        className="rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-emerald-700"
      >
        Check
      </button>
    </form>
  );
}
