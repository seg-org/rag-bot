import { z } from "zod";

const configSchema = z.object({
  NODE_ENV: z.string(),
  BOT_TOKEN: z.string(),
  BOT_CLIENT_ID: z.string(),
  GUILD_ID: z.string(),
});

export const config = configSchema.parse(process.env);
