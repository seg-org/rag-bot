import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { Message } from "discord.js";
import { llm } from "../../llm";
import { logger } from "../../logger/logger";
import { TextEmbedding } from "../../models";

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

  // const relevantTexts = await getRelevantText(content, message.guildId, 10);
  // const chatMessages = buildConversation([...relevantTexts]);
  const chatMessages = buildConversation([]);
  // if (chatMessages.length === 0)
  //   chatMessages.push(new AIMessage({ content: "-" }));
  chatMessages.push(new HumanMessage({ content: content }));

  // logger.info(`mentionHandler chatMessages: ${JSON.stringify(chatMessages)}`);

  logger.info(
    `mentionHandler chatMessages: ${chatMessages.map((m) => m.content)}`
  );
  const reply = await llm.completeChat(chatMessages);
  await message.channel.send(reply);
};

const buildConversation = (messages: TextEmbedding[]): BaseMessage[] => {
  return messages.map((message) => {
    if (message.source === "RAG-bot") {
      return new AIMessage({
        content: message.text,
      });
    }

    return new HumanMessage({
      content: message.text,
    });
  });
};
