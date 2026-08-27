import { logout } from "@/app/actions/auth";
import DashboardSessionGuard from "@/components/DashboardSessionGuard";
import { getStaffUser } from "@/lib/auth";
import { redirect } from "next/navigation";

// Everything under /dashboard is staff-only.

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  const user = await getStaffUser();
  if (!user) redirect("/login");

  return (
    <div className="max-md:contents md:relative md:left-1/2 md:-translate-x-1/2 md:w-[min(72rem,calc(100vw-2rem))]">
      <DashboardSessionGuard />
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3 mb-6">
        <p className="text-sm text-gray-600">
          {user.name}
        </p>
        <form action={logout}>
          <button type="submit" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Sign out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
