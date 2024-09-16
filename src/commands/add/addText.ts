import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { addText } from "../../api/api";
import { logger } from "../../logger/logger";

export const data = new SlashCommandBuilder()
  .setName("add-text")
  .setDescription("add text to chatbot's knowledge base")
  .addStringOption((option) =>
    option.setName("text").setDescription("The text to add").setRequired(true)
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  logger.info(
    `command: ${data.name}, text: ${interaction.options.getString("text")}`
  );

  if (!interaction.guild) return;

  const text = interaction.options.getString("text") ?? "";
  await interaction.deferReply();
  const reply = await addText(text, interaction.guild.id);

  await interaction.editReply(reply);
};