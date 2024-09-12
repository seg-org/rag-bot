import { z } from "zod";

const configSchema = z.object({
  NODE_ENV: z.string(),
  BOT_TOKEN: z.string(),
  BOT_CLIENT_ID: z.string(),
  API_URL: z.string(),
  API_KEY: z.string(),
});

export const config = configSchema.parse(process.env);
