import { Suspense } from "react";

import BookingResults from "@/components/home/BookingResults";
import BookingResultsSkeleton from "@/components/home/BookingResultsSkeleton";
import BookingSearch from "@/components/home/BookingSearch";
import HomeCta from "@/components/home/HomeCta";
import HomeHero from "@/components/home/HomeHero";
import HowItWorks from "@/components/home/HowItWorks";
import SiteFooter from "@/components/home/SiteFooter";
import WhyTrimTeam from "@/components/home/WhyTrimTeam";

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const email = typeof params.email === "string" ? params.email.trim() : "";

  return (
    <div className="space-y-16">
      <HomeHero />

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Check your booking</h2>
        <p className="mt-1 text-sm text-gray-600">
          Enter the email you booked with to see your bookings.
        </p>

        <BookingSearch email={email} />

        {email && (
          <Suspense key={email} fallback={<BookingResultsSkeleton />}>
            <BookingResults email={email} />
          </Suspense>
        )}
      </section>

      <HowItWorks />
      <WhyTrimTeam />
      <HomeCta />
      <SiteFooter />
    </div>
  );
}
