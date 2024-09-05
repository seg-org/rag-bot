import fs from "fs";
import path from "path";
import { z } from "zod";

interface PromptConfig {
  translate: {
    prompt: string;
    rules: string[];
  };
}

const readJSONFile = <T>(filename: string): T => {
  const currentDir = process.cwd();
  const filePath = path.join(currentDir, "src/config", filename);
  const rawData = fs.readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(rawData);
  return jsonData;
};
const rawPromptconfig: PromptConfig =
  readJSONFile<PromptConfig>("prompt_config.json");

const promptConfigSchema = z.object({
  translate: z.string(),
});

export const promptConfig = promptConfigSchema.parse({
  translate: `${rawPromptconfig.translate.prompt}\n${rawPromptconfig.translate.rules.join("\n")}`,
});
