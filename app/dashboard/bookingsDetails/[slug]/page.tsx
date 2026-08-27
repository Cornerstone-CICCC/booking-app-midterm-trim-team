import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { cancelDB, bookingsDB, confirmDB, updateDB } from "@/app/actions/dbComm";
import { CITIES, LAWN_SIZES, TIME_SLOTS } from "@/lib/types";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-y-0.5 py-3 border-b border-gray-100 last:border-b-0 sm:grid-cols-[6.75rem_1fr] sm:gap-x-6 sm:items-baseline">
      <label className="text-sm text-gray-500">{label}</label>
      <div>{children}</div>
    </div>
  );
}

const inputClass = "w-full border border-gray-300 rounded px-2 py-1.5 text-sm";

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

  const rail = railClasses(booking.status);

  async function updateInfo(formData: FormData) {
    "use server";
    const full_name = String(formData.get("full_name") ?? "") || booking.full_name;
    const email = String(formData.get("email") ?? "") || booking.email;
    const phone = String(formData.get("phone") ?? "") || booking.phone;
    const lawn_size = String(formData.get("lawn_size") ?? "") || booking.lawn_size;
    const note = String(formData.get("note") ?? "");
    const street = String(formData.get("street") ?? "") || booking.street_address;
    const city = String(formData.get("city") ?? "") || booking.city;
    const time_slot = String(formData.get("time_slot") ?? "") || booking.time_slot;
    const service_date = String(formData.get("service_date") ?? "") || booking.service_date;

    await updateDB(id, city, street, lawn_size, full_name, email, phone, service_date, time_slot, note);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <p className="mb-5">
        <Link href="/dashboard" className="text-sm font-medium text-green-800 hover:underline">
          ← Back to bookings
        </Link>
      </p>

      <div className="w-fit mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Edit booking</h1>
        <div className="h-1 bg-green-700 rounded-full mt-2" />
      </div>

      <div className="flex flex-col md:flex-row md:items-stretch border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
        <form id="update-booking" action={updateInfo} className="min-w-0 flex-1 px-4 sm:px-6 py-5">
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
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </Field>
          <Field label="Note">
            <input className={inputClass} type="text" name="note" defaultValue={booking.note ?? ""} />
          </Field>
        </form>

        <aside className={`flex flex-col gap-4 shrink-0 md:w-52 px-4 py-5 border-t md:border-t-0 md:border-l ${rail.wrap}`}>
          <div className={`rounded-xl bg-white px-3 py-3 border ${rail.card}`}>
            <p className="text-xs text-gray-500 mb-2">Status</p>
            <StatusBadge status={booking.status} className="block w-full text-sm py-1.5 text-center" />
          </div>

          <div className="md:mt-auto space-y-2">
            {booking.status !== "confirmed" && (
              <form action={confirmDB.bind(null, id)}>
                <button type="submit" className="w-full text-sm border border-green-800 text-green-800 bg-white rounded-lg px-3 py-2 hover:bg-green-50">
                  Confirm
                </button>
              </form>
            )}
            {booking.status !== "cancelled" && (
              <form action={cancelDB.bind(null, id)}>
                <button type="submit" className="w-full text-sm border border-red-600 text-red-600 bg-white rounded-lg px-3 py-2 hover:bg-red-50">
                  Cancel
                </button>
              </form>
            )}
            <button
              type="submit"
              form="update-booking"
              className="w-full text-sm border border-green-800 text-green-800 bg-white rounded-lg px-3 py-2 hover:bg-green-50"
            >
              Update information
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
