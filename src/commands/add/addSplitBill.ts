import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { addSplitBill } from "../../api/api";
import { logger } from "../../logger/logger";

export const data = new SlashCommandBuilder()
  .setName("add-split-bill")
  .setDescription("split bill equally between everyone")
  .addStringOption((option) =>
    option.setName("payer").setDescription("The name of the payer").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("participants").setDescription("The names of the participants (NOT INCLUDE PAYER) separated by spacebar").setRequired(true)
  )
  .addNumberOption((option) =>
    option.setName("amount").setDescription("The amount of money spent").setRequired(true)
  )

export const execute = async (interaction: ChatInputCommandInteraction) => {
  logger.info(
    `command: ${data.name}, payer: ${interaction.options.getString("payer")}, participants: ${interaction.options.getString("participants")}, amount: ${interaction.options.getNumber("amount")}`
  );

  if (!interaction.guild) return;

  const payer = interaction.options.getString("payer") ?? "";
  const participants = interaction.options.getString("participants") ?? "";
  const amount = interaction.options.getNumber("amount") ?? 0;
  await interaction.deferReply();
  const reply = await addSplitBill(payer, participants, amount, interaction.guild.id);

  await interaction.editReply(reply);
};