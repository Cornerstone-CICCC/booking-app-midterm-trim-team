


- using tailwindcss for styling
- already configured with Neon
- auth already working for staff users
- dashboard page already displays bookings from the DB
- Form pages are not implemented yet




-------- 



# Trim Team — Booking App
WD-301 midterm: online bookings for a Metro Vancouver lawn-care business.
Customers book without an account. Staff sign in to see and manage jobs.

**Team:** Jamie, Guil, Keisei, Nikola, Tatsuya

**Live site:** _add your deployment URL here_

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Neon Postgres (`@neondatabase/serverless`)
- Cookie sessions for staff (signed with `SESSION_SECRET`)

## Setup
1. Clone the repo and install:
```bash
npm install

2.   Copy .env.example to .env.local and set:
DATABASE_URL — Neon pooled connection string
SESSION_SECRET — long random string used to sign the staff cookie

3. Run the app:
```bash
npx next dev
```

4. Open http://localhost:3000.
