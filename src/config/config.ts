import { z } from "zod";

const configSchema = z.object({
  NODE_ENV: z.string(),
  DB_URL: z.string(),
  MSG_EXPIRY_SEC: z.number(),
  MAX_EMBED_DIST: z.number(),
  ENABLE_PROMPT_CONFIG: z.boolean(),
  BOT_TOKEN: z.string(),
  BOT_CLIENT_ID: z.string(),
  GUILD_ID: z.string(),
  OPENAI_API_KEY: z.string(),
});

export const config = configSchema.parse({
  ...process.env,
  MSG_EXPIRY_SEC: process.env.MSG_EXPIRY_SEC
    ? parseInt(process.env.MSG_EXPIRY_SEC)
    : 604800,
  MAX_EMBED_DIST: process.env.MAX_EMBED_DIST
    ? parseFloat(process.env.MAX_EMBED_DIST)
    : 0.8,
  ENABLE_PROMPT_CONFIG: process.env.ENABLE_PROMPT_CONFIG === "true",
});
