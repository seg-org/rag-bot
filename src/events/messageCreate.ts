import { Events, Message } from "discord.js";
import { mentionHandler } from "../handlers/mention";
import { logger } from "../logger/logger";

export const name = Events.MessageCreate;

export const execute = async (message: Message) => {
  logger.info(`event: ${name}`);
  if (!message.guildId) return;

  if (!message.author.bot && message.mentions.has(message.client.user)) {
    await mentionHandler(message);
  }
};
