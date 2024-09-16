import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { addBorrowMoney } from "../../api/api";
import { logger } from "../../logger/logger";

export const data = new SlashCommandBuilder()
  .setName("add-borrow-money")
  .setDescription("add debt to chatbot's knowledge base")
  .addStringOption((option) =>
    option.setName("borrower").setDescription("The name of the borrower").setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("lender").setDescription("The name of the lender").setRequired(true)
  )
  .addNumberOption((option) =>
    option.setName("amount").setDescription("The amount of money borrowed").setRequired(true)
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  logger.info(
    `command: ${data.name}, text: ${interaction.options.getString("text")}`
  );

  if (!interaction.guild) return;

  const borrower = interaction.options.getString("borrower") ?? "";
  const lender = interaction.options.getString("lender") ?? "";
  const amount = interaction.options.getNumber("amount") ?? 0;
  await interaction.deferReply();
  const reply = await addBorrowMoney(borrower, lender, amount, interaction.guild.id);

  await interaction.editReply(reply);
};
