import Link from "next/link";

// Full-bleed hero with a placeholder photo and a curved (half-circle) bottom.
// w-screen + left-1/2/-translate-x-1/2 breaks out of the max-w-3xl <main>;
// -mt-8 cancels the main's top padding so it sits directly under the header.

export default function HomeHero() {
  return (
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
          backgroundImage: "url('https://picsum.photos/seed/trimteam-lawn/1600/700')",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-br from-emerald-800/85 to-green-700/70" />

      <div className="relative mx-auto max-w-3xl px-6 pt-16 pb-24 text-center md:pt-24 md:pb-32">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-100">
          Lawn care in Metro Vancouver
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight md:text-5xl">
          Lawn care, booked in minutes.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-emerald-50">
          Tell us about your lawn, pick a time, and our local crew handles the rest —
          no phone tag, no haggling.
        </p>
        <Link
          href="/step1"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700 shadow-sm transition-colors hover:bg-emerald-50"
        >
          Book a service →
        </Link>
      </div>
    </section>
  );
}
