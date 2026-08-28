import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { cancelDB, bookingsDB, confirmDB, completedDB, applyUpdate } from "@/app/actions/dbComm";
import { CITIES, LAWN_SIZES, TIME_SLOTS, isEditableStatus } from "@/lib/types";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-y-0.5 py-3 border-b border-gray-100 last:border-b-0 sm:grid-cols-[6.75rem_1fr] sm:gap-x-6 sm:items-baseline">
      <label className="text-sm text-gray-500">{label}</label>
      <div>{children}</div>
    </div>
  );
}

const inputClass =
  "w-full border border-gray-300 rounded px-2.5 py-1.5 text-sm bg-white focus:outline-none focus:border-green-700";

function railClasses(status: string) {
  if (status === "pending") return { wrap: "bg-amber-50 border-amber-100", card: "border-amber-100" };
  if (status === "completed") return { wrap: "bg-blue-50 border-blue-100", card: "border-blue-100" };
  if (status === "cancelled") return { wrap: "bg-red-50 border-red-100", card: "border-red-100" };
  return { wrap: "bg-green-50 border-green-100", card: "border-green-100" };
}

export default async function BookingEditPage({ params }: PageProps<"/dashboard/bookingsDetails/[slug]">) {
  const { slug: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isInteger(id) || id < 1) notFound();

  const booking = await bookingsDB(id);
  if (!booking) notFound();
  if (!isEditableStatus(booking.status)) redirect(`/dashboard/${id}`);

  const rail = railClasses(booking.status);

  async function updateInfo(formData: FormData) {
    "use server";
    await applyUpdate(id, formData, booking);
    redirect(`/dashboard/${id}`);
  }

  async function confirmBooking(formData: FormData) {
    "use server";
    await applyUpdate(id, formData, booking);
    await confirmDB(id);
  }

  async function completeBooking(formData: FormData) {
    "use server";
    await applyUpdate(id, formData, booking);
    await completedDB(id);
    redirect(`/dashboard/${id}`);
  }

  async function cancelBooking(formData: FormData) {
    "use server";
    await applyUpdate(id, formData, booking);
    await cancelDB(id);
    redirect(`/dashboard/${id}`);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <p className="mb-5">
        <Link href={`/dashboard/${id}`} className="text-sm font-medium text-green-800 hover:underline">
          ← Back to booking
        </Link>
      </p>

      <div className="w-fit mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Edit booking</h1>
        <div className="h-1 bg-green-700 rounded-full mt-2" />
      </div>

      <form
        action={updateInfo}
        className="flex flex-col md:flex-row md:items-stretch border border-gray-200 rounded-lg overflow-hidden bg-white"
      >
        <div className="min-w-0 flex-1 px-4 sm:px-6 py-5">
          <Field label="Client name">
            <input className={inputClass} type="text" name="full_name" defaultValue={booking.full_name} />
          </Field>
          <Field label="email">
            <input className={inputClass} type="email" name="email" defaultValue={booking.email} />
          </Field>
          <Field label="Phone">
            <input className={inputClass} type="text" name="phone" defaultValue={booking.phone} />
          </Field>
          <Field label="Lawn size">
            <select className={inputClass} name="lawn_size" defaultValue={booking.lawn_size}>
              {LAWN_SIZES.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Date/Time">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input className={inputClass} type="date" name="service_date" defaultValue={booking.service_date} />
              <select className={inputClass} name="time_slot" defaultValue={booking.time_slot}>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
          </Field>
          <Field label="Address">
            <div className="flex flex-col gap-2">
              <input className={inputClass} type="text" name="street" defaultValue={booking.street_address} />
              <select className={inputClass} name="city" defaultValue={booking.city}>
                {(CITIES.includes(booking.city as (typeof CITIES)[number]) ? CITIES : [booking.city, ...CITIES]).map(
                  (city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ),
                )}
              </select>
            </div>
          </Field>
          <Field label="Note">
            <input className={inputClass} type="text" name="note" defaultValue={booking.note ?? ""} />
          </Field>
        </div>

        <aside className={`flex flex-col gap-4 shrink-0 md:w-52 px-4 py-5 border-t md:border-t-0 md:border-l ${rail.wrap}`}>
          <div className={`rounded bg-white px-3 py-3 border ${rail.card}`}>
            <p className="text-xs text-gray-500 mb-2">Status</p>
            <StatusBadge status={booking.status} className="block w-full text-sm py-1.5 text-center" />
          </div>

          <div className="md:mt-auto space-y-2">
            <button
              type="submit"
              className="w-full text-sm bg-green-50 text-green-800 border border-green-700 rounded px-3 py-2 hover:bg-green-100"
            >
              Update information
            </button>
            {booking.status === "pending" && (
              <button
                type="submit"
                formAction={confirmBooking}
                className="w-full text-sm border border-green-800 text-green-800 bg-white rounded px-3 py-2 hover:bg-green-50"
              >
                Confirm
              </button>
            )}
            {booking.status === "confirmed" && (
              <button
                type="submit"
                formAction={completeBooking}
                className="w-full text-sm border border-blue-600 text-blue-700 bg-white rounded px-3 py-2 hover:bg-blue-50"
              >
                Completed
              </button>
            )}
            {isEditableStatus(booking.status) && (
              <button
                type="submit"
                formAction={cancelBooking}
                className="w-full text-sm border border-red-600 text-red-600 bg-white rounded px-3 py-2 hover:bg-red-50"
              >
                Cancel
              </button>
            )}
          </div>
        </aside>
      </form>
    </div>
  );
}
