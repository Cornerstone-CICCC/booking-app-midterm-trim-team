"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";

export type LoginState = { error?: string };

// Login action
export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  // Get the email and password from the form data.
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  // If the email or password is empty, return an error.
  if (!email || !password) return { error: "Email and password are required." };

  // Check if the email is in the database.
  // If the email is in the database, get the user's id and password hash.
  const rows = await sql`
    select id, password_hash from staff_users where lower(email) = ${email}
  `;
  const user = rows[0];

  // If the email is not in the database or the password is wrong, return an error.
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return { error: "Wrong email or password." };
  }

  // Create a session for the user and redirect to the dashboard.
  await createSession(user.id);
  redirect("/dashboard");
}

// Logout action
export async function logout() {
  await destroySession();
  redirect("/login");
}
