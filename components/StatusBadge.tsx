import { statusLabel } from "@/lib/types";

// Coloured pill for pending / confirmed / completed / cancel.

const COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs px-2 py-1 rounded ${COLORS[status] ?? "bg-gray-100"}`}>
      {statusLabel(status)}
    </span>
  );
}
