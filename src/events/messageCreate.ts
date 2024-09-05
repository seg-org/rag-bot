import { Events, Message } from "discord.js";
import { addText } from "../api/api";
import { mentionHandler } from "../handlers/mention";
import { logger } from "../logger/logger";

export const name = Events.MessageCreate;

export const execute = async (message: Message) => {
  logger.info(`event: ${name}`);
  if (!message.guildId) return;

  if (!message.author.bot && message.mentions.has(message.client.user)) {
    await mentionHandler(message);
  }

  // if (!message.author.bot && Math.random() < 0.1) {
  //   await samlamHandler(message);
  //   return;
  // }

  logger.info(`Saving text from ${message.author.tag}`);
  await addText(message.content);
};
