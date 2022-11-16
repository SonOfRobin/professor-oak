//const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const schedule = {
  'Week1': {
    'Match1': '(2-0)__**Robinson**__ vs  ~~Weems~~',
    'Match2': '(2-0) ~~Caba~~ vs __**Hamm**__',
  },
  'Week2': {
    'Match1': '(2-0)__**Caba**__ vs ~~Weems~~',
    'Match2': '(2-1)~~Crawf~~ vs __**Hamm**__',
  },
  'Week3': {
    'Match1': '(2-0)~~Robinson~~ vs __**Hamm**__',
    'Match2': '(2-0)~~Caba~~ vs __**Crawf**__',
  },
  'Week4': {
    'Match1': '(2-1)__**Robinson**__ vs ~~Crawf~~',
    'Match2': '(2-0)~~Weems~~ vs __**Hamm**__',
  },
  'Week5': {
    'Match1': '(2-1)~~Robinson~~ vs __**Caba**__',
    'Match2': '(2-1)__**Weems**__ vs ~~Crawf~~',
  },
  'Week6': {
    'Match1': '(2-0)__**Robinson**__ vs ~~Weems~~',
    'Match2': '(2-0)__**Caba**__ vs ~~Hamm~~',
  },
  'Week7': {
    'Match1': '(2-0)__**Hamm**__ vs ~~Crawf~~',
    'Match2': '(2-0)__**Caba**__ vs ~~Weems~~',
  },
  'Week8': {
    'Match1': '(2-0)~~Robinson~~ vs __**Hamm**__',
    'Match2': '(2-1)__**Caba**__ vs ~~Crawf~~',
  },
  'Week9': {
    'Match1': 'Hamm vs Weems',
    'Match2': 'Robinson vs Crawf',
  },
  'Week10': {
    'Match1': 'Robinson vs Caba',
    'Match2': 'Weems vs Crawf',
  },
};

const schedule2 = {
  'Week1': {
    'Match1': '(2-0)Robinson vs ~~Weems~~',
    'Match2': '(2-0)~~Caba~~ vs Hamm',
  },
  'Week2': {
    'Match1': '(2-0)__**Caba**__ vs  ~~Weems ~~',
    'Match2': '(2-1)Crawf vs __**Hamm**__',
  },
  'Week3': {
    'Match1': '(2-0)~~Robinson~~ vs __**Hamm**__',
    'Match2': '(2-0)~~Caba~~ vs __**Crawf**__',
  },
  'Week4': {
    'Match1': '(2-1)__**Robinson**__ vs  ~~Crawf~~',
    'Match2': '(2-0)~~Weems~~ vs __**Hamm**__',
  },
  'Week5': {
    'Match1': '(2-1)~~Robinson~~ vs Caba',
    'Match2': '(2-1)Weems vs ~~Crawf~~',
  },
  'Week6': {
    'Match1': '(2-0)Robinson vs ~~Weems~~',
    'Match2': '(2-0)Caba vs ~~Hamm~~',
  },
  'Week7': {
    'Match1': '(2-0)Hamm vs ~~Crawf~~',
    'Match2': '(2-0)Caba vs ~~Weems~~',
  },
  'Week8': {
    'Match1': '(2-0)~~Robinson~~ vs Hamm',
    'Match2': '(2-1)Caba vs ~~Crawf~~',
  },
  'Week9': {
    'Match1': 'Hamm vs Weems',
    'Match2': 'Robinson vs Crawf',
  },
  'Week10': {
    'Match1': 'Robinson vs Caba',
    'Match2': 'Weems vs Crawf',
  },
};

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName('schedule')
//     .setDescription('Check the entire schedule for the league'),
//   async execute(interaction) {
//     const exampleEmbed = new EmbedBuilder();
//     exampleEmbed
//       .setTitle('BDSP Ubers/OU League')
//       .setDescription('Schedule')
//       .setColor('Red');

//     for (const week in schedule2) {
//       exampleEmbed.addFields({ name: `${week}`, value: `>>> ${schedule[week]['Match1']}\n${schedule[week]['Match2']}`, inline: true });
//     }
//     await interaction.reply({ embeds: [exampleEmbed] });
//   },
// };

export const scheduleCommand = {
  data: new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Check the entire schedule for the league'),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder();
    exampleEmbed
      .setTitle('BDSP Ubers/OU League')
      .setDescription('Schedule')
      .setColor('Red');

    for (const week in schedule2) {
      exampleEmbed.addFields({ name: `${week}`, value: `>>> ${schedule[week]['Match1']}\n${schedule[week]['Match2']}`, inline: true });
    }
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};