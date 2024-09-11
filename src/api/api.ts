import { AxiosResponse } from "axios";
import { logger } from "../logger/logger";
import { apiClient } from "./axios";
import { AddDTO, CompleteChatDTO } from "./dto";

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
    const res: AxiosResponse<AddDTO> = await apiClient.post("/documents/text", {
      text: text,
    });

    return res.data.reply;
  } catch (error) {
    logger.error("Failed to add text", error);
    return "Failed to add text";
  }
};

export const addWeb = async (url: string) => {
  try {
    const res: AxiosResponse<AddDTO> = await apiClient.post("/documents/web", {
      url: url,
    });

    return res.data.reply;
  } catch (error) {
    logger.error("Failed to add web", error);
    return "Failed to add web";
  }
};

export const recordMessage = async (text: string) => {
  try {
    // const res: AxiosResponse<AddDTO> = await apiClient.post("/documents/text", {
    //   text: text,
    // });
    // return res.data;
    return { reply: "Message recorded" };
  } catch (error) {
    logger.error("Failed to record message", error);
    return "Failed to record message";
  }
};
