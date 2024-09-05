import { config } from "../config/config";
import { llm } from "../llm";
import { TextEmbedding } from "../models";
import { database } from "./database";

export const saveText = async (
  text: string,
  source: string,
  guildID: string
): Promise<number> => {
  const vector = await llm.embed(text);
  const embedding: TextEmbedding = {
    text,
    source,
    vector,
    guildID,
  };

  const embedID = await database.saveEmbedding(embedding);
  return embedID;
};

export const getRelevantText = async (
  text: string,
  guildID: string,
  limit: number = 1
): Promise<TextEmbedding[]> => {
  const vector = await llm.embed(text);
  const embedding: TextEmbedding = {
    text,
    source: "query",
    vector,
  };

  const similarTexts = await database.getSimilar(
    embedding,
    limit,
    config.MAX_EMBED_DIST,
    guildID
  );
  return similarTexts;
};
