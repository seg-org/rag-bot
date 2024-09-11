import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { addWeb } from "../../api/api";
import { logger } from "../../logger/logger";

export const data = new SlashCommandBuilder()
  .setName("add-web")
  .setDescription("add web's content to chatbot's knowledge base")
  .addStringOption((option) =>
    option
      .setName("url")
      .setDescription("The url of web content to add")
      .setRequired(true)
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  logger.info(
    `command: ${data.name}, url: ${interaction.options.getString("url")}`
  );

  if (!interaction.guild) return;

  const url = interaction.options.getString("url") ?? "";
  await interaction.deferReply();
  const reply = await addWeb(url);

  await interaction.editReply(reply);
};
