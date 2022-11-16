import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';


export const abilitiesCommand = {
  data: new SlashCommandBuilder()
    .setName('abilities')
    .setDescription('Get info on an ability')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('The name of the ability')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('choice')
        .setDescription('Would you like to see all pokemon with this ability?')
        .setRequired(true)
        .addChoices(
          { name: 'Yes', value: 'yes' },
          { name: 'No', value: 'no' },
        )),
  async execute(interaction) {
    // add more validation later
    // if (interaction.options.getString('name'))
    const pokeJSON = await getAbility(interaction.options.getString('name').toLowerCase());

    if (!pokeJSON) {
      await interaction.reply({ content: 'I\'d help you with that search, but you a coon', ephemeral: true });
      return;
    }
    if (pokeJSON.effect_entries.length === 0) {
      await interaction.reply({ content: 'It\'s not you, it\'s me. I couldn\'t find any data on that ability', ephemeral: true });
      return;
    }

    const name = pokeJSON.name;
    const effect = getEffect(pokeJSON.effect_entries);
    console.log(name, 'debug 3');

    const pokeEmbed = new EmbedBuilder()
      .setTitle(`${name}\n`)
      .setDescription(null)
      .setColor('Random')
      .addFields({ name: 'Effect', value: `>>> ${effect}` });
    await interaction.reply({ embeds: [pokeEmbed] });

    if (interaction.options.getString('choice') === 'yes') {
      const pokemon = [];
      for (const obj of pokeJSON.pokemon) {
        pokemon.push(`${obj.pokemon.name}`);
      }
      console.log(pokemon);
      await interaction.followUp(pokemon.join('\n'));
    }

  },
};

async function getAbility(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/ability/${name}`);
    const data = await response.json();
    console.log(data.name, 'debug 1');
    return data;
  }
  catch (error) {
    return null;
  }

}

function getEffect(effectArray) {
  console.log(effectArray);
  for (const obj of effectArray) {
    // console.log(obj.effect, 'function debug');
    if (obj.language.name === 'en') return obj.effect;
  }
}