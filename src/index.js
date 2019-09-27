const { Client, Collection } = require('discord.js');
const { settings, token } = require('./config.json')
const client = new Client(settings);

client.commands = new Collection();

client.once('ready', () => console.log(`Logged in as ${client.user.tag}`));
require('./structures/loadCommand.js')('commands/', client);

client.login(token);;