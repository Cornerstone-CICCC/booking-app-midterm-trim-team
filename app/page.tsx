import BookingLookup from "@/components/home/BookingLookup";
import HomeCta from "@/components/home/HomeCta";
import HomeHero from "@/components/home/HomeHero";
import HowItWorks from "@/components/home/HowItWorks";
import SiteFooter from "@/components/home/SiteFooter";
import WhyTrimTeam from "@/components/home/WhyTrimTeam";

// let bookings = (await sql`
//       select
//       from bookings
//       where email = 'x'
//     `) as Booking[]

export default async function HomePage() {
  // async function search(formData: FormData) {
  //   'use server'
  //   bookings = await searchDB(formData.get('email')?.toString() || '')
  // }

  return (
    <div className="space-y-16">
      <HomeHero />
      <BookingLookup />
      <HowItWorks />
      <WhyTrimTeam />
      <HomeCta />
      <SiteFooter />
    </div>
  );
}
