import { Client } from "pg";
import { config } from "../config/config";
import { logger } from "../logger/logger";
import { TextEmbedding } from "../models";

class Database {
  private client: Client;

  constructor(connectionString: string) {
    this.client = new Client({
      connectionString,
    });

    this.client.connect();
    this.client.query("CREATE EXTENSION IF NOT EXISTS vector");
    this.client.query(`
        CREATE TABLE IF NOT EXISTS embedding (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMPTZ,
        text TEXT NOT NULL,
        source TEXT NOT NULL,
        guild_id TEXT,
        vector vector(1536) NOT NULL
        )`);
  }

  async saveEmbedding(embedding: TextEmbedding): Promise<number> {
    const query = `INSERT INTO embedding ("text", source, guild_id, vector, expires_at) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
    try {
      const expiry = new Date(
        new Date().getTime() + config.MSG_EXPIRY_SEC * 1000
      );

      const response = await this.client.query(query, [
        embedding.text,
        embedding.source,
        embedding.guildID,
        "[" + embedding.vector.toLocaleString() + "]",
        expiry,
      ]);

      return response.rows[0].id;
    } catch (error) {
      logger.error("Error saving embedding:", error);
      throw new Error("Failed to save embedding");
    }
  }

  async getSimilar(
    embedding: TextEmbedding,
    limit: number = 1,
    maxDistance: number = 0.8,
    guildID: string
  ): Promise<TextEmbedding[]> {
    const query = `WITH dist as (
      SELECT text, source, vector, vector <=> $1 as distance 
      FROM embedding
      WHERE expires_at > current_timestamp AND guild_id = $2
    )
    SELECT text, source, vector, distance FROM dist WHERE distance <= $3 ORDER BY distance LIMIT $4`;
    try {
      const response = await this.client.query<TextEmbedding>(query, [
        "[" + embedding.vector.toLocaleString() + "]",
        guildID,
        maxDistance,
        limit,
      ]);

      return response.rows;
    } catch (error) {
      logger.error("Error completing chat:", error);
      throw new Error("Failed to complete chat");
    }
  }
}

export const database = new Database(config.DB_URL);
