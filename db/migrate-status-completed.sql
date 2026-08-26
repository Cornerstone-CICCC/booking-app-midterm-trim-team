-- Update the live Neon bookings.status check to allow `completed`.
-- schema.sql only applies to new tables (CREATE TABLE IF NOT EXISTS),
-- so existing Neon databases need this ALTER.

alter table bookings drop constraint if exists bookings_status_check;

alter table bookings
  add constraint bookings_status_check
  check (status in ('pending', 'confirmed', 'completed', 'cancelled'));
