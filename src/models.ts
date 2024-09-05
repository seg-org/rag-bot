export interface TextEmbedding {
  text: string;
  source: string;
  vector: number[];
  guildID?: string;
  distance?: number;
}
