const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { buildPanelContainer } = require('../utils/panelBuilder');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('panel')
    .setDescription('Golazo destek panelini kurar')
    .setDefaultMemberPermissions(0),

  async execute(interaction) {
    await interaction.reply({
      components: [buildPanelContainer(interaction.guild)],
      flags: MessageFlags.IsComponentsV2,
    });
  },
};
