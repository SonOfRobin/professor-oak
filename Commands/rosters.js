// const { SlashCommandBuilder, EmbedBuilder, User } = require('discord.js');
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
//  const { result } = require('underscore');
// const database = require('../database.js');
import { getRoster } from '../database.js';
// const wait = require('node:timers/promises').setTimeout;
// const emojiFinder = require('../index');
import { getEmoji } from '../index.js';

export const rostersCommand = {
  data: new SlashCommandBuilder()
    .setName('rosters')
    .setDescription('Check the full roster of any league trainer')
    .addStringOption(option =>
      option.setName('trainer')
        .setDescription('Which trainer are you looking for?')
        .setRequired(true)
        .addChoices(
          { name: 'Robinson', value: 'Robinson' },
          { name: 'Hamm', value: 'Hamm' },
          { name: 'Weems', value: 'Weems' },
          { name: 'Caba', value: 'Caba' },
          { name: 'Crawf', value: 'Crawf' },
        )),
  async execute(interaction) {
    const choice = interaction.options.getString('trainer');
    console.log(getRoster(choice));
    const newResult = await getRoster(choice);
    const team = newResult[0].team;
    // setTimeout(() => {
    //   console.log(team, 'command call');
    // }, 2000);

    const exampleEmbed = new EmbedBuilder()
      .setColor('Random')
      .setTitle('BDSP Ubers League')
      .setDescription(`${choice}'s Team`)
      .setThumbnail();
    for (let i = 0; i < team.length; i++) {
      exampleEmbed.addFields({ name: `${i <= 1 ? 'Uber' : 'OU'}`, value: `${team[i]}`, inline: true });
    }
    // console.log(team, 'The Roster');
    // await interaction.deferReply();
    // await wait(4000);
    const message = [];
    for (const pokemon of team) {
      message.push(`<a:${pokemon.toLowerCase()}:${getEmoji(pokemon.toLowerCase())}>`);
    }
    await interaction.reply({ embeds: [exampleEmbed] });
    await interaction.followUp(message.join(''));
  },
};