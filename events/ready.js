const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`[BOT] ${client.user.tag} olarak giris yapildi.`);
    console.log(`[BOT] ${client.guilds.cache.size} sunucuda aktif.`);

    client.user.setPresence({
      activities: [
        {
          name: 'Golazo — Destek Merkezi',
          type: ActivityType.Watching,
        },
      ],
      status: 'online',
    });
  },
};
