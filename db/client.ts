import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/lib/env";

/**
 * Shared database client. On serverless, keep the pool small and point
 * DATABASE_URL at a transaction-mode pooler (PgBouncer or the provider's pooler).
 * Pool creation does not connect. The first query does.
 */
const pool = new Pool({ connectionString: env.DATABASE_URL, max: 5 });

export const db = drizzle(pool);
