import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export const pokemonCommand = {
  data: new SlashCommandBuilder()
    .setName('pokemon')
    .setDescription('Get info on a pokemon')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('The name of the pokemon')
        .setRequired(true)),
  async execute(interaction) {
    // add more validation later
    // if (interaction.options.getString('name'))
    const pokeJSON = await getPokemon(interaction.options.getString('name').toLowerCase());

    if (!pokeJSON) {
      await interaction.reply({ content: 'I\'d help you with that search, but you a coon', ephemeral: true });
      return;
    }
    // console.log(pokeJSON.types.type.name);
    getAbilities(pokeJSON.abilities);
    const name = pokeJSON.name[0].toUpperCase().concat(pokeJSON.name.substring(1));

    const pokeEmbed = new EmbedBuilder()
      .setTitle(`${name}\n> ${getTypes(pokeJSON.types).join('-')}`)
      .setDescription(null)
      .setImage(getImageURL(pokeJSON.name))
      .setColor(setColor(getTypes(pokeJSON.types)[0]))
      .addFields({ name: 'Abilities', value: `> ${getAbilities(pokeJSON.abilities)}` })
      .addFields({ name: 'Base Stats', value: `>>> ${getAllStats(pokeJSON.stats)}` });
    await interaction.reply({ embeds: [pokeEmbed] });

  },
};

export function getImageURL(name) {
  console.log(name);
  if (name.endsWith('incarnate')) name = name.slice(0, -10);
  console.log(name);
  return `https://play.pokemonshowdown.com/sprites/ani/${name}.gif`;

}

async function getPokemon(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    console.log(data.name);
    return data;
  }
  catch (error) {
    return null;
  }

}

function getStats(stat, statArray) {
  const result = statArray.filter(item => item['stat']['name'] === stat);
  // console.log(result);
  return result[0]['base_stat'].toString();
}

function getAllStats(statArray) {
  const arrayResult = [];
  const stringStats = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
  const labels = ['**HP**', '**ATK**', '**DEF**', '**SpA**', '**SpD**', '**Spe**'];
  for (let i = 0; i < 6; i++) {
    arrayResult.push(`${labels[i]}: ${getStats(stringStats[i], statArray)}`);
  }
  // console.log(arrayResult, 'array result');
  return arrayResult.join('\t');
}

function getTypes(typeArray) {
  const result = [];
  for (const obj of typeArray) {
    result.push(`${obj.type.name}`);
  }
  // console.log(result);
  return result;
}

export function getAbilities(abilityArray) {
  const result = [];
  for (const obj of abilityArray) {
    result.push(`*${abilityArray.indexOf(obj) + 1}*. **${obj.ability.name}**`);
  }
  console.log(result);
  return result.join('  ');
}

function setColor(type) {
  if (type === 'fire') return 'Red';
  if (type === 'water') return 'Blue';
  if (type === 'grass') return 'Green';
  if (type === 'electric') return 'Yellow';
  if (type === 'normal') return 'a2a2a2';
  if (type === 'ice') return '97FFFF';
  if (type === 'fighting') return 'DarkRed';
  if (type === 'poison') return 'Purple';
  if (type === 'ground') return 'bc992d';
  if (type === 'flying') return 'cfe2f3';
  if (type === 'psychic') return 'ff0096';
  if (type === 'bug') return 'd4fa01';
  if (type === 'rock') return 'E1D9B0';
  if (type === 'ghost') return '9734FF';
  if (type === 'dragon') return '7347ff';
  if (type === 'dark') return '5f4800';
  if (type === 'steel') return 'bcbcbc';
  if (type === 'fairy') return 'ff7aef';
}