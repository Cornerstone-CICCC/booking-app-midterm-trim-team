import { redirect } from "next/navigation";

export default async function OldEditRedirect({ params }: PageProps<"/dashboard/bookingsDetails/[slug]">) {
  const { slug } = await params;
  redirect(`/dashboard/${slug}/edit`);
}
