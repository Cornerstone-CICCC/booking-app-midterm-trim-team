import { statusLabel } from "@/lib/types";

// Coloured pill for pending / confirmed / completed / cancelled.

const COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-700",
};

export default function StatusBadge({
  status,
  className = "",
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${COLORS[status] ?? "bg-gray-100 text-gray-700"} ${className}`}
    >
      {statusLabel(status)}
    </span>
  );
}
