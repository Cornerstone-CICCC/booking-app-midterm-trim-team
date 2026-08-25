import { logout } from "@/app/actions/auth";
import { getStaffUser } from "@/lib/auth";

// Everything under /dashboard is staff-only.
// TO-DO: Add a proxy.ts to check if the user is signed in.

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {

  const user = await getStaffUser();

  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
        <p className="text-sm text-gray-600">
          Signed in as <strong>{user?.name}</strong>
        </p>
        <form action={logout}>
          <button type="submit" className="text-sm underline">
            Sign out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
