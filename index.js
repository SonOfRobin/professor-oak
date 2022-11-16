//const database = require('./database.js');
import { connect } from './database.js'
//const { Client, GatewayIntentBits, Collection } = require('discord.js');
import { Client, GatewayIntentBits, Collection } from 'discord.js';
//const { token } = require('./config.json');
import config from './config.json' assert { type: "json" };
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { rostersCommand } from './Commands/rosters.js';
import { pokemonCommand } from './Commands/pokemon.js';
import { scheduleCommand } from './Commands/schedule.js';
import { abilitiesCommand } from './Commands/abilities.js';
import { setsCommand } from './Commands/sets.js';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection()
  .set(rostersCommand.data.name, rostersCommand)
  .set(pokemonCommand.data.name, pokemonCommand)
  .set(scheduleCommand.data.name, scheduleCommand)
  .set(abilitiesCommand.data.name, abilitiesCommand)
  .set(setsCommand.data.name, setsCommand);

// console.log(__dirname);
// const commandsPath = path.join(__dirname, 'commands');
// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
//   const filePath = path.join(commandsPath, file);
//   const command = require(filePath);
//   //import command from `${filePath}`
//   console.log(command);
//   client.commands.set(command.data.name, command);
// }

// When the client is ready, run this code (only once)
client.once('ready', () => {
  connect();
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  // console.log(interaction, 'DEBUGGING');
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;
  // console.log('DEBUGGING 22222');
  try {
    await command.execute(interaction);
  }
  catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

// Login to discord with client token
client.login(config.token);

export function getEmoji(emojiName) {
  const emojis = [];
  for (const guild of client.guilds.cache.values()) {
    if (guild.available) for (const emoji of guild.emojis.cache.values()) emojis.push(emoji.id, emoji);
  }
  const emoji = (emojis.find(e => e.name === emojiName));
  if (emoji) return emoji.id;
}
//module.exports.getEmoji = getEmoji;