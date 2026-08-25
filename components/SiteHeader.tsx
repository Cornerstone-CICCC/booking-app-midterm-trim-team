import Link from "next/link";

// The bar at the top of every page.

export default function SiteHeader() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold">
          Trim Team
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/step1">Book</Link>
          <Link href="/dashboard">Staff Login</Link>
        </nav>
      </div>
    </header>
  );
}
