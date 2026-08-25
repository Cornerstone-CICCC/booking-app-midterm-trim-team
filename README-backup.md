# WD-301 Midterm: Booking App

Most real projects start with a business pain, not a feature list. Yours starts
here:

> A small business takes bookings by phone. The owner misses calls,
> double-books, and tracks everything in a notebook. They've hired your team
> to take bookings online and give staff one place to manage them.

## Pick your business

Any booking-driven business you like: restaurant reservations, haircuts,
car detailing, photo sessions, tutoring, clinic appointments. Pick one and
commit to it. Your form fields, wording, and dashboard should fit that
business, not a generic "booking".

## What you must build

**A public booking page.** Anyone on the internet can book, no login.

- A multi-page form (at least 3 steps, e.g. contact, then service and date,
  then review). You may use a library for the multi-step form, but **more
  points are awarded if you build your own multi-step system**.
- Server-side validation with visible error messages
- On submit, the booking is saved to the database

Wireframes of the major pages are in `docs/page-sketches.pdf`. They show
required features, not required layout.

**A protected dashboard.** Staff only: visiting it signed out must redirect
to a login. After signing in, staff can:

- See all bookings
- Edit a booking
- Change a booking's status (e.g. pending, confirmed, cancelled)
- Delete a booking
- Filter the list by attributes (e.g. status, service, date)

How you structure routes, components, and the schema is up to your team.
That is part of what we are assessing.

## Hard requirements

- **Live database.** Use a free hosted Postgres (e.g. [Neon](https://neon.tech)).
  Demoing against localhost in the final presentation will **heavily impact
  your marks**.
- **Live site.** The app must be deployed and publicly reachable.
  **One deployment per team.**
- **Submission README.** Your repo's README must contain the live deployment
  link. No link, no marks for deployment.
- **Check sign-in where the data changes.** Every piece of server code that
  creates, edits, or deletes a booking must first check the user is signed
  in. The login redirect only hides the dashboard page. It does not stop
  requests sent straight to the server.

## Submission

1. One repo per team, one deployment per team.
2. README with: team members, chosen business, live site link.
3. Be ready to demo live, on the deployed site, not localhost.

Good luck. Build it like the owner is paying you.
