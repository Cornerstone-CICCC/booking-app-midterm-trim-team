# Trim Team — Booking App

WD-301 midterm: online bookings for a Metro Vancouver lawn-care business.
Customers book without an account. Staff sign in to see and manage jobs.

**Team:** Jamie, Guil, Keisei, Nikola, Tatsuya

**Live site:** https://trim-team.vercel.app

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Neon Postgres (`@neondatabase/serverless`)
- Cookie sessions for staff (signed with `SESSION_SECRET`)

## Routes
- `/` — public home
- `/step1`, `/step2`, `/step3` — public booking form
- `/login` — staff sign-in
- `/dashboard` — staff booking list (filter by status, city, lawn size)
- `/dashboard/[id]` — staff booking detail (read-only)
- `/dashboard/[id]/edit` — staff edit, confirm, complete, or cancel

## Setup
1. Clone the repo and install:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and set:
   - `DATABASE_URL` — Neon pooled connection string
   - `SESSION_SECRET` — long random string used to sign the staff cookie

3. Run the app:

```bash
npx next dev
```

4. Open http://localhost:3000.

Staff emails are in `db/seed-staff.sql`. The password for those accounts is `admin`.
