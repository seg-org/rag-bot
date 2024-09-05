import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("user")
  .setDescription("provides user info");

export const execute = async (interaction: CommandInteraction) => {
  if (!interaction.member || !interaction.guild) return;

  const member = interaction.guild.members.cache.get(interaction.user.id);
  if (!member) return;

  await interaction.reply(
    `This command was run by ${interaction.user.username}, who joined on ${member.joinedAt}.`
  );
};
