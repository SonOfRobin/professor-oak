// const { REST } = require('@discordjs/rest');
import { REST } from '@discordjs/rest';
// const { Routes } = require('discord.js');
import { Routes } from 'discord.js';
// const { clientId, guildId, token } = require('./config.json');
import config from './config.json' assert { type: "json" };
import { rostersCommand as rosters } from './Commands/rosters.js';
import { pokemonCommand as pokemon } from './Commands/pokemon.js';
import { scheduleCommand as schedule } from './Commands/schedule.js';
import { abilitiesCommand as abilities } from './Commands/abilities.js';
import { setsCommand } from './Commands/sets.js';

const commands = [rosters.data, pokemon.data, schedule.data, abilities.data, setsCommand.data];

const rest = new REST({ version: '10' }).setToken(config.token);

// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
// 	.then(() => console.log('Successfully registered application commands.'))
// 	.catch(console.error);

// Register all commands globaly
rest.put(Routes.applicationCommands(config.clientId), { body: commands })
  .then(() => console.log('Successfully registered all global commands.'))
  .catch(console.error);

// Delete specific commands. Grab guild id from server -> interactions
// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
//   .then(() => console.log('Successfully deleted guild command'))
//   .catch(console.error);

// Delete all commands
// rest.put(Routes.applicationCommands(clientId), { body: [] })
//   .then(() => console.log('Successfully deleted all global commands'))
//   .catch(console.error);