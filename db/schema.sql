-- This SQL code was used to create the postgres database schema in neon.

-- ---------------------------------------------------------------------------
-- Staff users (the only people who log in)
-- ---------------------------------------------------------------------------
create table if not exists staff_users (
  id            serial primary key,
  name          text        not null,
  email         text        not null unique,
  password_hash text        not null,          -- bcrypt hash
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Bookings (created by the public form, managed by staff)
-- ---------------------------------------------------------------------------
create table if not exists bookings (
  id             serial primary key,

  -- step 1: the job
  city           text not null, 
  street_address text not null,
  lawn_size      text not null check (lawn_size in ('small', 'medium', 'large', 'extra_large')),

  -- step 2: the customer
  full_name      text not null,
  email          text not null,
  phone          text not null,

  -- step 3: when
  service_date   date not null,
  time_slot      text not null check (time_slot in ('morning', 'afternoon', 'full_day')),

  -- staff-managed fields
  status         text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  note           text,

  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- For looking up bookings in the dashboard and the availability check.
create index if not exists bookings_status_idx on bookings (status);
create index if not exists bookings_service_date_idx on bookings (service_date);