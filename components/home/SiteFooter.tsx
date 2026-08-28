import Link from "next/link";

export default function SiteFooter() {
  return (
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
  );
}
