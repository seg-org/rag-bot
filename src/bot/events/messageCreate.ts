import { Events, Message } from "discord.js";
import { saveText } from "../../embedding/service";
import { logger } from "../../logger/logger";
import { mentionHandler } from "../handlers/mention";

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
  await saveText(message.content, message.author.displayName, message.guildId);
};
