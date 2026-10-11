const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

client.commands = new Collection();

require('./handlers/commandHandler')(client);
require('./handlers/eventHandler')(client);

client.login(config.botToken);
