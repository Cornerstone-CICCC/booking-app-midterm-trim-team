import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { sql } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { lawnSizeLabel, timeSlotLabel, type Booking } from "@/lib/types";

// NOTE: 叩き案のトップページ。TaskEasy風の構成を、機能が「予約」と
// 「管理者ログイン」だけの実態に合わせて絞ったもの。数字類は仮の値。
// レイアウト(app/layout.tsx)が既にヘッダーと max-w-3xl の <main> を持つため、
// ヘッダーは重複させず、Heroだけ w-screen でその幅制約の外に出している。

const STEPS = [
  {
    icon: "📍",
    title: "Tell us about your lawn",
    body: "Your city, address, and lawn size — that's all we need to start.",
  },
  {
    icon: "📅",
    title: "Pick a date & time",
    body: "Choose the day and the time slot that works best for you.",
  },
  {
    icon: "🌱",
    title: "We mow, you relax",
    body: "Our local crew takes care of the rest. Sit back and enjoy a fresh lawn.",
  },
];

const FEATURES = [
  {
    icon: "💵",
    title: "Transparent pricing",
    body: "Clear rates based on lawn size. No haggling, no surprises.",
  },
  {
    icon: "🚛",
    title: "Local crews",
    body: "Trusted teams serving 19 cities across Metro Vancouver.",
  },
  {
    icon: "⚡",
    title: "Easy online booking",
    body: "Book your service online in under two minutes.",
  },
  {
    icon: "✅",
    title: "Satisfaction guaranteed",
    body: "Not happy with the result? We'll come back and make it right.",
  },
];

export default async function HomePage({ searchParams }: PageProps<"/">) {
  // Email lookup: GET form posts back to "/?email=...", we read it here and
  // fetch that customer's bookings server-side. No client JS needed.
  const params = await searchParams;
  const email = typeof params.email === "string" ? params.email.trim() : "";

  const bookings = email
    ? ((await sql`
        select
          id, city, street_address, lawn_size, full_name, email, phone,
          to_char(service_date, 'YYYY-MM-DD') as service_date,
          time_slot, status, note, created_at, updated_at
        from bookings
        where lower(email) = ${email.toLowerCase()}
        order by service_date asc, time_slot asc
      `) as Booking[])
    : [];

  return (
    <div className="space-y-16">
      {/* Hero — full-bleed image with a curved (half-circle) bottom edge.
          w-screen + left-1/2/-translate-x-1/2 breaks out of the max-w-3xl main;
          -mt-8 cancels the main's top padding so it sits under the header. */}
      <section
        className="relative left-1/2 -mt-8 w-screen -translate-x-1/2 overflow-hidden text-white"
        style={{
          borderBottomLeftRadius: "50% 56px",
          borderBottomRightRadius: "50% 56px",
        }}
      >
        {/* Placeholder photo — swap the URL for a real lawn/house image later. */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://picsum.photos/seed/trimteam-lawn/1600/700')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/85 to-green-700/70" />

        <div className="relative mx-auto max-w-3xl px-6 pt-16 pb-24 text-center md:pt-24 md:pb-32">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-100">
            Lawn care in Metro Vancouver
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-5xl">
            Lawn care, booked in minutes.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-emerald-50">
            Tell us about your lawn, pick a time, and our local crew handles the
            rest — no phone tag, no haggling.
          </p>
          <Link
            href="/step1"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700 shadow-sm transition-colors hover:bg-emerald-50"
          >
            Book a service →
          </Link>
        </div>
      </section>

      {/* Check your booking (email lookup) */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Check your booking</h2>
        <p className="mt-1 text-sm text-gray-600">
          Enter the email you booked with to see your bookings.
        </p>

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

        {email && (
          <div className="mt-5">
            {bookings.length === 0 ? (
              <p className="text-sm text-gray-500">
                No bookings found for <span className="font-medium">{email}</span>.
              </p>
            ) : (
              <ul className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-100">
                {bookings.map((booking) => (
                  <li
                    key={booking.id}
                    className="flex items-start justify-between gap-3 p-3"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {formatDate(booking.service_date)} ·{" "}
                        {timeSlotLabel(booking.time_slot)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.street_address}, {booking.city} ·{" "}
                        {lawnSizeLabel(booking.lawn_size)}
                      </p>
                    </div>
                    <StatusBadge status={booking.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-center text-2xl font-bold text-gray-900">How it works</h2>
        <p className="mt-2 text-center text-gray-500">
          Three simple steps to a fresh lawn.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-2xl">
                {step.icon}
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                Step {i + 1}
              </p>
              <h3 className="mt-1 font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Trim Team */}
      <section>
        <h2 className="text-center text-2xl font-bold text-gray-900">Why Trim Team</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xl">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{feature.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-2xl bg-emerald-50 p-8 text-center md:p-10">
        <h2 className="text-2xl font-bold text-gray-900">Ready for a greener lawn?</h2>
        <p className="mt-2 text-gray-600">
          Book your first service today — it only takes a couple of minutes.
        </p>
        <Link
          href="/step1"
          className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
        >
          Get started →
        </Link>
      </section>

      {/* Mini footer */}
      <footer className="border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
        <p>Trim Team — lawn care in Metro Vancouver.</p>
        <p className="mt-1">
          Staff member?{" "}
          <Link href="/login" className="text-emerald-700 hover:underline">
            Log in here
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}
