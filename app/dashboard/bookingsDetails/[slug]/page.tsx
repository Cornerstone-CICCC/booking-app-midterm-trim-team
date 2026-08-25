import { lawnSizeLabel, timeSlotLabel, type Booking } from '@/lib/types'
import { formatDate } from '@/lib/format'
import StatusBadge from '@/components/StatusBadge'
import { confirmDB, bookingsDB, cancelDB } from '@/app/actions/dbComm'
import { revalidatePath } from 'next/cache'

export default async function bookingsDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let slug = parseInt((await params).slug)
  const bookings = await bookingsDB(slug)
  // confirmDB(parseInt((await params).slug))
  //cancelDB(parseInt((await params).slug))
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Booking</h1>

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium">
            Client name: <input type="text" placeholder={bookings.full_name} />
          </p>
          <p>
            email: <input type="text" placeholder={bookings.email} />
          </p>
          <p>
            Phone: <input type="text" placeholder={bookings.phone} />
          </p>

          <p>
            Lawn size: <input type="text" placeholder={bookings.lawn_size} />
          </p>
          <p className="text-sm text-gray-600">
            {formatDate(bookings.service_date)} ·{' '}
            {timeSlotLabel(bookings.time_slot)}
          </p>
          <p className="text-sm text-gray-600">
            Adress:{' '}
            <input
              type="text"
              placeholder={bookings.street_address + ', ' + bookings.city}
            />
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Note:{' '}
            <input
              type="text"
              placeholder={bookings.note ? bookings.note : 'Add note'}
            />
          </p>
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
            // TO-DO: Add action to cancel booking
            <form action={cancelDB.bind(null, slug)}>
              <button className="text-xs border border-red-600 text-red-600 rounded px-2 py-1">
                Cancel
              </button>
            </form>
          )}
          <button className="text-xs border border-green-700 text-green-700 rounded px-2 py-1">
            Update information
          </button>
        </div>
      </div>
    </div>
  )
}
