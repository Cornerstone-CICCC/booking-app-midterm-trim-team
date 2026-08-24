import { neon } from "@neondatabase/serverless";

// neon() tagged template: ${values} are query params, not string concat.
export const sql = neon(process.env.DATABASE_URL!);
