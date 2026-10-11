const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if (command.data) {
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(config.botToken);

(async () => {
  try {
    console.log(`[DEPLOY] ${commands.length} komut kaydediliyor...`);

    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commands }
    );

    console.log('[DEPLOY] Komutlar basariyla kaydedildi.');
  } catch (error) {
    console.error('[DEPLOY] Hata:', error);
  }
})();
