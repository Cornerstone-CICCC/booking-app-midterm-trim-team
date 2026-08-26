import { timeSlotLabel } from '@/lib/types'
import { formatDate } from '@/lib/format'
import StatusBadge from '@/components/StatusBadge'
import { confirmDB, bookingsDB, cancelDB, updateDB } from '@/app/actions/dbComm'
import Form from 'next/form'

export default async function bookingsDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let slug = parseInt((await params).slug)
  const bookings = await bookingsDB(slug)
  async function updateInfo(formData: FormData) {
    'use server'
    let full_name = formData.get('full_name')?.toString() || bookings.full_name
    let email = formData.get('email')?.toString() || bookings.email
    let phone = formData.get('phone')?.toString() || bookings.phone
    let lawn_size = formData.get('lawn_size')?.toString() || bookings.lawn_size
    let note = formData.get('note')?.toString() || bookings.note
    let street = formData.get('street')?.toString() || bookings.street_address
    let city = formData.get('city')?.toString() || bookings.city
    let time_slot = formData.get('time_slot')?.toString() || bookings.time_slot
    let service_date = formData.get('service_date') || bookings.service_date

    const res = await updateDB(
      slug,
      city,
      street,
      lawn_size,
      full_name,
      email,
      phone,
      service_date,
      time_slot,
      note,
    )
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Booking</h1>

      <div className="flex items-start justify-between gap-3">
        <div>
          <form action={updateInfo}>
            <p className="font-medium">
              Client name:{' '}
              <input
                type="text"
                name="full_name"
                placeholder={bookings.full_name}
              />
            </p>
            <p>
              email:{' '}
              <input type="text" placeholder={bookings.email} name="email" />
            </p>
            <p>
              Phone:{' '}
              <input type="text" placeholder={bookings.phone} name="phone" />
            </p>

            <p>
              Lawn size:{' '}
              <input
                type="text"
                placeholder={bookings.lawn_size}
                name="lawn_size"
              />
            </p>
            <p className="text-sm text-gray-600">
              <input
                type="text"
                placeholder={formatDate(bookings.service_date)}
                name="service_date"
              />{' '}
              ·{' '}
              <input
                type="text"
                placeholder={timeSlotLabel(bookings.time_slot)}
                name="time_slot"
              />
            </p>
            <p className="text-sm text-gray-600">
              Adress:{' '}
              <input
                type="text"
                placeholder={bookings.street_address + ', '}
                name="street"
              />
              <input type="text" placeholder={bookings.city} name="city" />
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Note:{' '}
              <input
                type="text"
                placeholder={bookings.note ? bookings.note : 'Add note'}
                name="note"
              />
            </p>
            <button className="text-xs border border-green-700 text-green-700 rounded px-2 py-1">
              Update information
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-2">
          <StatusBadge status={bookings.status} />
          {bookings.status !== 'confirmed' && (
            <form action={confirmDB.bind(null, slug)}>
              <button className="text-xs border border-green-700 text-green-700 rounded px-2 py-1">
                Confirm
              </button>
            </form>
          )}
          {bookings.status !== 'cancelled' && (
            <form action={cancelDB.bind(null, slug)}>
              <button className="text-xs border border-red-600 text-red-600 rounded px-2 py-1">
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
