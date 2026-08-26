import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "./db";

// ---------------------------------------------------------------------------
// Staff authentication — cookie sessions
//
// How it works:
//   1. /login checks the email + password against the `staff_users` table
//   2. We put the user's id in a cookie, together with a signature made with
//      SESSION_SECRET:  "7.9f2c1b..."  =  userId "." HMAC(userId)
//   3. On every request we recompute the signature. If it doesn't match, the
//      cookie was edited by hand and we ignore it — so nobody can log in as
//      user 1 by typing "1" into their cookie jar.
// ---------------------------------------------------------------------------

const COOKIE_NAME = "trim_team_session"; // must match proxy.ts SESSION_COOKIE
const ONE_WEEK = 60 * 60 * 24 * 7;

export type StaffUser = { id: number; name: string; email: string };

function signature(value: string) {
  return crypto.createHmac("sha256", process.env.SESSION_SECRET!).update(value).digest("hex");
}

/** Called by the login action after the password checked out. */
export async function createSession(userId: number) {
  const value = `${userId}.${signature(String(userId))}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_WEEK,
  });
}

/** Called by the logout action. */
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

/** The signed-in staff member, or null. Reads the cookie, then the database. */
export async function getStaffUser(): Promise<StaffUser | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;

  const [userId, sig] = raw.split(".");
  if (!userId || !sig || sig !== signature(userId)) return null;

  const rows = await sql`
    select id, name, email from staff_users where id = ${Number(userId)}
  `;
  return (rows[0] as StaffUser) ?? null;
}
