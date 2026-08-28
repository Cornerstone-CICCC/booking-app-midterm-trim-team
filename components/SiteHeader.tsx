import Link from "next/link";
import { cookies } from "next/headers";

// The bar at the top of every page.
// Cookie name must match `COOKIE_NAME` in lib/auth.ts.

export default async function SiteHeader() {
  const signedIn = Boolean((await cookies()).get("trim_team_session")?.value);

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold">
          Trim Team
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/dashboard">{signedIn ? "Dashboard" : "Staff Login"}</Link>
        </nav>
      </div>
    </header>
  );
}
