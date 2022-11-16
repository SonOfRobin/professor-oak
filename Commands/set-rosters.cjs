// We need to have this command choose a user, and then allow an admin enter 10 strings and assign those to an embed that
// we'll store somewhere on the server. maybe an admin only chat or a DM to the user?
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const exampleEmbed = new EmbedBuilder()
  .setColor(0x0099FF);


export const command = {
  data: new SlashCommandBuilder()
    .setName('set-rosters')
    .setDescription('DEPRECATED')
    .addStringOption(option =>
      option.setName('member')
        .setDescription('The league member')
        .setRequired(true)
        .addChoices(
          { name: 'Robinson', value: 'robinson' },
          { name: 'Hamm', value: 'hamm' },
          { name: 'Weems', value: 'weems' },
          { name: 'Caba', value: 'caba' },
          { name: 'Crawf', value: 'crawf' },
        ))
    .addStringOption(option =>
      option.setName('mons')
        .setDescription('DEPRECATED')
        .setRequired(true),
    ),
  async execute(interaction) {
    let choice = interaction.options.getString('member');
    choice = choice[0].toUpperCase() + choice.substring(1);

    exampleEmbed
      .setTitle('BDSP Ubers/OU League')
      .setDescription(`${choice}'s Team`);

    console.log(interaction.options.getString('member'));
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};