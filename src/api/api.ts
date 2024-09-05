import { AxiosResponse } from "axios";
import { logger } from "../logger/logger";
import { apiClient } from "./axios";
import { CompleteChatDTO } from "./dto";

export const completeChat = async (text: string) => {
  try {
    const res: AxiosResponse<CompleteChatDTO> = await apiClient.get(
      "/complete-chat",
      {
        params: { text: text },
      }
    );

    return res.data.reply;
  } catch (error) {
    logger.error("Failed to complete chat", error);
    return "Failed to complete chat";
  }
};

export const addText = async (text: string) => {
  try {
    const res: AxiosResponse<null> = await apiClient.post("/add-text", {
      text: text,
    });

    return res.data;
  } catch (error) {
    logger.error("Failed to add text", error);
    return "Failed to add text";
  }
};
