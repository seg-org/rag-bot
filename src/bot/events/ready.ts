import { Client, Events } from "discord.js";
import { logger } from "../../logger/logger";

export const name = Events.ClientReady;

export const once = true;

export const execute = (client: Client<true>) => {
  logger.info(`Ready! Logged in as ${client.user.tag}`);
};
