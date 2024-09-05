import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import type { BaseMessage } from "@langchain/core/messages";
import { AIMessage, AIMessageChunk } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { logger } from "../logger/logger";

class LLM {
  private embedModel: OpenAIEmbeddings;
  private chatChain: RunnableWithMessageHistory<any, AIMessageChunk>;
  private messageHistory: InMemoryChatMessageHistory;

  constructor() {
    this.embedModel = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });

    this.messageHistory = new InMemoryChatMessageHistory();
    this.messageHistory.addMessage(new AIMessage({ content: "hi" }));

    const model = new ChatOpenAI({
      model: "gpt-3.5-turbo-16k",
      temperature: 0,
    });
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a helpful assistant who remembers all details the user shares with you. Every reply must NOT exceed 200 characters`,
      ],
      ["placeholder", "{chat_history}"],
      ["human", "{input}"],
    ]);
    const chain = prompt.pipe(model);

    this.chatChain = new RunnableWithMessageHistory({
      runnable: chain,
      getMessageHistory: () => {
        return this.messageHistory;
      },
      inputMessagesKey: "input",
      historyMessagesKey: "chat_history",
    });
  }

  async embed(text: string): Promise<number[]> {
    try {
      const res = await this.embedModel.embedQuery(text);

      return res;
    } catch (error) {
      logger.error("Error embedding text:", error);
      throw new Error("Failed to embed text");
    }
  }

  async completeChat(chatMessages: BaseMessage[]): Promise<string> {
    try {
      // const input: BaseMessage[] = chatMessages;
      const lastMessage = chatMessages[chatMessages.length - 1];
      // if (config.ENABLE_PROMPT_CONFIG)
      //   input.unshift(new AIMessage({ content: promptConfig.translate }));

      logger.info("messages", chatMessages[0]);
      logger.info("lastMessage", lastMessage);
      const res = await this.chatChain.invoke(
        {
          // chat_history: input,
          input: lastMessage,
        },
        {
          configurable: {
            sessionId: "-",
          },
        }
      );

      await this.messageHistory.addMessage(lastMessage);

      return res.content.toString();
    } catch (error) {
      logger.error("Error completing chat:", error);
      throw new Error("Failed to complete chat");
    }
  }
}

export const llm = new LLM();
