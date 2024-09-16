import { AxiosResponse } from "axios";
import { logger } from "../logger/logger";
import { apiClient } from "./axios";
import { AddDTO, CompleteChatDTO, ToggleDTO } from "./dto";
import { number } from "zod";

export const completeChat = async (text: string, guildID: string) => {
  try {
    const res: AxiosResponse<CompleteChatDTO> = await apiClient.get(
      `/guild/${guildID}/complete-chat`,
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

export const addText = async (text: string, guildID: string) => {
  try {
    const res: AxiosResponse<AddDTO> = await apiClient.post(
      `/guild/${guildID}/documents/text`,
      {
        text: text,
      }
    );

    return res.data.reply;
  } catch (error) {
    logger.error("Failed to add text", error);
    return "Failed to add text";
  }
};

export const addWeb = async (url: string, guildID: string) => {
  try {
    const res: AxiosResponse<AddDTO> = await apiClient.post(
      `/guild/${guildID}/documents/web`,
      {
        url: url,
      }
    );

    return res.data.reply;
  } catch (error) {
    logger.error("Failed to add web", error);
    return "Failed to add web";
  }
};

export const toggleWebSearch = async (guildID: string) => {
  try {
    const res: AxiosResponse<ToggleDTO> = await apiClient.post(
      `/guild/${guildID}/toggle-web-search`
    );

    return res.data.reply;
  } catch (error) {
    logger.error("Failed to toggle web search", error);
    return "Failed to toggle web search";
  }
};

export const addBorrowMoney = async (borrower: string, lender: string, amount: number, guildID: string) => {
  try {
    const res: AxiosResponse<AddDTO> = await apiClient.post(
      `/guild/${guildID}/debt/add-borrow-money`,
      {
        borrower: borrower,
        lender: lender,
        amount: amount,
      }
    );

    return res.data.reply;
  } catch (error) {
    logger.error("Failed to add text", error);
    return "Failed to add text";
  }
};

export const askDebtSummary = async (person: string, guildID: string) => {
  try {
    const res: AxiosResponse<CompleteChatDTO> = await apiClient.post(
      `/guild/${guildID}/debt/ask-debt-summary`,
      {
        person: person,
      }
    );

    return res.data.reply;
  } catch (error) {
    logger.error("Failed to add text", error);
    return "Failed to add text";
  }
}