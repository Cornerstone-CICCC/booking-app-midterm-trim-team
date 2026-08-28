import Link from "next/link";

import HeroCarousel from "./HeroCarousel";

export default function HomeHero() {
  return (
    <section className="relative left-1/2 -mt-8 w-screen -translate-x-1/2 overflow-hidden text-white">
      <HeroCarousel />
      <div className="absolute inset-0 bg-linear-to-br from-emerald-800/60 to-green-700/10" />

      <div className="relative mx-auto max-w-3xl px-6 pt-16 pb-28 text-center md:pt-24 md:pb-36">
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

      <svg
        className="absolute inset-x-0 bottom-0 h-16 w-full fill-white"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,0 Q720,100 1440,0 L1440,100 L0,100 Z" />
      </svg>
    </section>
  );
}
