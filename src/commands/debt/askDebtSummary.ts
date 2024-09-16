import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { askDebtSummary } from "../../api/api";
import { logger } from "../../logger/logger";

export const data = new SlashCommandBuilder()
  .setName("ask-debt-summary")
  .setDescription("ask for debt summary of a person")
  .addStringOption((option) =>
    option.setName("person").setDescription("The name of the person").setRequired(true)
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  logger.info(
    `command: ${data.name}, person: ${interaction.options.getString("person")}`
  );

  if (!interaction.guild) return;

  const person = interaction.options.getString("person") ?? "";
  await interaction.deferReply();
  const reply = await askDebtSummary(person, interaction.guild.id);

  await interaction.editReply(reply);
};
