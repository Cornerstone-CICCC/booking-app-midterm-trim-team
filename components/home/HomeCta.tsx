import Link from "next/link";

export default function HomeCta() {
  return (
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
  );
}
