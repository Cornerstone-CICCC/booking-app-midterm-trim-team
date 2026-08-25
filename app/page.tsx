import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Trim Team</h1>

      <Link href="/step1" className="inline-block bg-green-700 text-white rounded px-5 py-3">
        Book a service
      </Link>
    </div>
  );
}
