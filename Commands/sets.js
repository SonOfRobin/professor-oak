import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import fetch from 'node-fetch';

export const setsCommand = {
  data: new SlashCommandBuilder()
    .setName('sets')
    .setDescription('Get smogon movesets for desired pokemon')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('The name of the pokemon')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('usage')
        .setDescription('Set the usage tier')
        .setRequired(true)),
  async execute(interaction) {
    // add more validation later
    // if (interaction.options.getString('name'))

    const pokemon = interaction.options.getString('name').toLowerCase();
    const usage = interaction.options.getString('usage').toLowerCase();

    const pokeJSON = await getPokeJson(pokemon);
    if (!pokeJSON) {
      await interaction.reply({ content: 'I\'d help you with that search, but you a coon', ephemeral: true });
      return;
    }
    const sets = getTierSetsArray(pokeJSON, usage);

    // await interaction.deferReply();
    // await wait.setTimeout(4000);
    await interaction.reply(`Here are some ${usage.toUpperCase()} sets for ${pokemon} `);

    for (const set of sets) {
      await interaction.followUp({ embeds: [createEmbed(pokemon, set)] });
    }
  },
};


async function getPokeJson(name) {
  try {

    const body = {
      gen: 'dp',
      alias: name,
      language: 'en',
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    };

    console.log(body);

    console.log(JSON.stringify(body));

    const response = await fetch('https://www.smogon.com/dex/_rpc/dump-pokemon', options);
    const data = await response.json();
    console.log(data.strategies);
    return data.strategies;
  }
  catch (error) {
    return null;
  }

}

function getTierSetsArray(strategies, usage) {
  const sets = [];
  for (const tier of strategies) {
    if (usage.toLowerCase() === tier.format.toLowerCase()) {

      for (const set of tier.movesets) {
        sets.push({
          name: set.name,
          abilities: set.abilities,
          items: set.items,
          moveslots: set.moveslots,
          natures: set.natures,
          evs: set.evconfigs[0],
        });
      }
      // console.log(sets);
    }
  }
  // console.log(moveset.name);
  return sets;
}

function createEmbed(pokemon, set) {
  const name = pokemon[0].toUpperCase().concat(pokemon.substring(1));

  const setEmbed = new EmbedBuilder()
    .setTitle(name)
    .setDescription(set.name)
    .setThumbnail('https://implyingrigged.info/w/images/3/38/Smogon_logo.png')
    .addFields({ name: 'Ability', value: set.abilities.join('/') })
    .addFields({ name: 'Nature', value: set.natures.join('/') })
    .addFields({ name: 'Item', value: set.items.join('/') })
    .setColor('Random');

  const evConfig = [];
  for (const ev in set.evs) {
    if (set.evs[ev] > 0) {
      evConfig.push(`${ev.toUpperCase()}: ${set.evs[ev]}/`);
    }
  }

  const moves = [];
  for (const slot of set.moveslots) {
    if (slot.length > 1) {
      const slotArray = [];
      for (const move in slot) {
        slotArray.push(slot[move].move);
      }
      moves.push(slotArray.join('/'));
    }
    else {
      moves.push(slot[0].move);
    }
  }

  setEmbed.addFields({ name: 'EVs', value: evConfig.join('\t') });
  setEmbed.addFields({ name: 'Moveset', value: moves.join('\n') });

  return setEmbed;

}
