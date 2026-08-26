// One labelled row in a definition list (used on the booking detail page).

export default function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-3 py-3">
      <dt className="text-sm text-gray-600">{label}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}
