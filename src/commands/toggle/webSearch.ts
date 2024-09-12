import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { toggleWebSearch } from "../../api/api";
import { logger } from "../../logger/logger";

export const data = new SlashCommandBuilder()
  .setName("toogle-web-search")
  .setDescription(
    "toggle to enable/disable using the internet to search for answers"
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  logger.info(`command: ${data.name}`);

  if (!interaction.guild) return;

  await interaction.deferReply();
  const reply = await toggleWebSearch(interaction.guild.id);

  await interaction.editReply(reply);
};
