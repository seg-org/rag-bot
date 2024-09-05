import { Message } from "discord.js";
import { completeChat } from "../api/api";
import { logger } from "../logger/logger";

export const mentionHandler = async (message: Message) => {
  logger.info(`mentionHandler: ${message.content}`);
  if (!message.guildId) return;

  if (
    message.content.includes("@here") ||
    message.content.includes("@everyone")
  )
    return;

  const rawContent = message.content;
  const regex = /<@(.*?)>/g;
  const content = rawContent.replace(regex, "").trim();
  logger.info(`mentionHandler actual content: ${content}`);

  const reply = await completeChat(content);
  await message.channel.send(reply);
};
