import { z } from "zod";

/**
 * Server environment. Parsed once at boot (see instrumentation.ts).
 * Optional groups stay optional until their integration ships, and the
 * integration module then requires them explicitly.
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.url({ message: "must be a valid postgres:// URL" }),
  AUTH_SECRET: z.string().min(32, { message: "must be at least 32 characters" }),
  APP_URL: z.url({ message: "must be an absolute URL" }),
  RESEND_API_KEY: z.string().min(1).optional(),
  EMAIL_FROM: z.string().min(1).optional(),
  PAYSTACK_SECRET_KEY: z.string().min(1).optional(),
  FLUTTERWAVE_SECRET_KEY: z.string().min(1).optional(),
  UPSTASH_REDIS_REST_URL: z.url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
  /** Development only. Enables the placeholder viewer in lib/session.ts. Ignored in production. */
  DEV_DEMO_VIEWER: z.enum(["1", "client", "studio"]).optional(),
  /** Shared secret for the scheduled notifications job. Requests without it are refused. */
  CRON_SECRET: z.string().min(16, { error: "must be at least 16 characters" }).optional(),
  /** S3-compatible object storage: Cloudflare R2 (https) or MinIO for local work (http). Path-style URLs. */
  STORAGE_ENDPOINT_URL: z.url().optional(),
  STORAGE_BUCKET: z.string().min(1).optional(),
  STORAGE_REGION: z.string().min(1).optional(),
  STORAGE_ACCESS_KEY_ID: z.string().min(1).optional(),
  STORAGE_SECRET_ACCESS_KEY: z.string().min(1).optional(),
});

export type ServerEnv = z.infer<typeof serverSchema>;

export function parseServerEnv(source: NodeJS.ProcessEnv = process.env): ServerEnv {
  const result = serverSchema.safeParse(source);
  if (!result.success) {
    const lines = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `Cadence cannot start: invalid or missing environment variables.\n${lines}\nCopy .env.example to .env.local and fill in the values.`,
    );
  }
  return result.data;
}

export const env: ServerEnv = parseServerEnv();
