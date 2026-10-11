const {
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
  MessageFlags,
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
} = require('discord.js');

const config = require('../config.json');
const {
  buildCategorySelectContainer,
  buildCategorySelectRow,
  buildTeknikDestekContainer,
  buildDegerContainer,
  buildButceContainer,
  buildSatinAlmaContainer,
  buildOdulTalepContainer,
  buildTicketManageButtons,
  buildTicketHeader,
  buildTicketAcceptedContainer,
  buildTicketRenamedContainer,
  buildTicketNoteContainer,
  buildUserAddedContainer,
  buildUserRemovedContainer,
  buildRatingContainer,
  buildRatingDMContainer,
  buildRatingLogContainer,
  buildRatingThankYouContainer,
  buildRenameModal,
  buildNoteModal,
  buildAddUserModal,
  buildRemoveUserModal,
  buildTicketCloseConfirm,
  buildSuccessContainer,
  buildErrorContainer,
  CATEGORIES,
} = require('../utils/panelBuilder');

const ticketData = new Map();

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      return handleSlashCommand(interaction);
    }
    if (interaction.isStringSelectMenu()) {
      return handleSelectMenu(interaction);
    }
    if (interaction.isButton()) {
      return handleButton(interaction);
    }
    if (interaction.isModalSubmit()) {
      return handleModal(interaction);
    }
  },
};

async function handleSlashCommand(interaction) {
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (err) {
    console.error('[ERROR]', err);
    await safeReply(interaction, buildErrorContainer('İşlem sirasinda bir hata olustu.'));
  }
}

async function handleSelectMenu(interaction) {
  if (interaction.customId === 'ticket_category') {
    return handleCategorySelect(interaction);
  }
}

async function handleButton(interaction) {
  const { customId } = interaction;

  if (customId === 'open_ticket') return handleOpenTicket(interaction);
  if (customId === 'ticket_close') return handleCloseTicket(interaction);
  if (customId === 'ticket_accept') return handleAcceptTicket(interaction);
  if (customId === 'ticket_add') return handleAddUser(interaction);
  if (customId === 'ticket_remove') return handleRemoveUser(interaction);
  if (customId === 'ticket_rename') return handleRename(interaction);
  if (customId === 'ticket_note') return handleNote(interaction);
  if (customId.startsWith('rate_')) return handleRating(interaction);
}

async function handleModal(interaction) {
  if (interaction.customId === 'ticket_rename_modal') return handleRenameSubmit(interaction);
  if (interaction.customId === 'ticket_note_modal') return handleNoteSubmit(interaction);
  if (interaction.customId === 'ticket_add_modal') return handleAddUserSubmit(interaction);
  if (interaction.customId === 'ticket_remove_modal') return handleRemoveUserSubmit(interaction);
}

// ═══════════════════════════════════════
// TICKET ACMA
// ═══════════════════════════════════════

async function handleOpenTicket(interaction) {
  await interaction.reply({
    components: [buildCategorySelectContainer(), buildCategorySelectRow()],
    flags: MessageFlags.IsComponentsV2,
    ephemeral: true,
  });
}

async function handleCategorySelect(interaction) {
  const category = interaction.values[0];

  await interaction.update({
    components: [buildSuccessContainer('Talebiniz alınıyor, lutfen bekleyiniz...')],
    flags: MessageFlags.IsComponentsV2,
  });

  const guild = interaction.guild;
  const member = interaction.member;

  const categoryObj = CATEGORIES.find(c => c.value === category);
  const categoryLabel = categoryObj ? categoryObj.label : category;

  const categoryContainers = {
    teknik_destek: buildTeknikDestekContainer,
    deger: buildDegerContainer,
    butce: buildButceContainer,
    satin_alma: buildSatinAlmaContainer,
    odul_talep: buildOdulTalepContainer,
  };

  const channelName = `destek-${category}-${member.user.username}`;

  try {
    const ticketChannel = await guild.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      parent: config.kategoriId || null,
      permissionOverwrites: [
        { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
        {
          id: member.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
        {
          id: config.yetkiliRolId,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
      ],
    });

    ticketData.set(ticketChannel.id, {
      channelId: ticketChannel.id,
      userId: member.id,
      category: categoryLabel,
      guildName: guild.name,
      createdAt: Date.now(),
    });

    const containerFn = categoryContainers[category];
    const header = buildTicketHeader(member.id, config.yetkiliRolId, categoryLabel);
    const buttons = buildTicketManageButtons();

    await ticketChannel.send({
      components: [header, containerFn(), ...buttons],
      flags: MessageFlags.IsComponentsV2,
    });

    await interaction.editReply({
      components: [buildSuccessContainer(`Ticket oluşturuldu: <#${ticketChannel.id}>`)],
      flags: MessageFlags.IsComponentsV2,
    });
  } catch (err) {
    console.error('[TICKET ERROR]', err);
    await interaction.editReply({
      components: [buildErrorContainer('Ticket oluşturulurken bir hata olustu.')],
      flags: MessageFlags.IsComponentsV2,
    });
  }
}

// ═══════════════════════════════════════
// TICKET YONETIM
// ═══════════════════════════════════════

async function handleAcceptTicket(interaction) {
  const hasRole = interaction.member.roles.cache.has(config.yetkiliRolId);
  const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);
  if (!hasRole && !isAdmin) {
    return interaction.reply({
      components: [buildErrorContainer('Bu işlemi sadece yetkililer yapabilir.')],
      flags: MessageFlags.IsComponentsV2,
      ephemeral: true,
    });
  }

  await interaction.reply({
    components: [buildTicketAcceptedContainer(interaction.user.id)],
    flags: MessageFlags.IsComponentsV2,
  });
}

async function handleAddUser(interaction) {
  const hasRole = interaction.member.roles.cache.has(config.yetkiliRolId);
  const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);
  if (!hasRole && !isAdmin) {
    return interaction.reply({
      components: [buildErrorContainer('Bu işlemi sadece yetkililer yapabilir.')],
      flags: MessageFlags.IsComponentsV2,
      ephemeral: true,
    });
  }

  await interaction.showModal(buildAddUserModal());
}

async function handleRemoveUser(interaction) {
  const hasRole = interaction.member.roles.cache.has(config.yetkiliRolId);
  const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);
  if (!hasRole && !isAdmin) {
    return interaction.reply({
      components: [buildErrorContainer('Bu işlemi sadece yetkililer yapabilir.')],
      flags: MessageFlags.IsComponentsV2,
      ephemeral: true,
    });
  }

  await interaction.showModal(buildRemoveUserModal());
}

async function handleRename(interaction) {
  const hasRole = interaction.member.roles.cache.has(config.yetkiliRolId);
  const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);
  if (!hasRole && !isAdmin) {
    return interaction.reply({
      components: [buildErrorContainer('Bu işlemi sadece yetkililer yapabilir.')],
      flags: MessageFlags.IsComponentsV2,
      ephemeral: true,
    });
  }

  await interaction.showModal(buildRenameModal());
}

async function handleNote(interaction) {
  const hasRole = interaction.member.roles.cache.has(config.yetkiliRolId);
  const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);
  if (!hasRole && !isAdmin) {
    return interaction.reply({
      components: [buildErrorContainer('Bu işlemi sadece yetkililer yapabilir.')],
      flags: MessageFlags.IsComponentsV2,
      ephemeral: true,
    });
  }

  await interaction.showModal(buildNoteModal());
}

// ═══════════════════════════════════════
// MODAL ISLEMLERI
// ═══════════════════════════════════════

async function handleAddUserSubmit(interaction) {
  const userId = interaction.fields.getTextInputValue('add_user_id').trim();

  try {
    const member = await interaction.guild.members.fetch(userId);
    await interaction.channel.permissionOverwrites.edit(member.id, {
      ViewChannel: true,
      SendMessages: true,
      ReadMessageHistory: true,
    });

    await interaction.reply({
      components: [buildUserAddedContainer(interaction.user.id, userId)],
      flags: MessageFlags.IsComponentsV2,
    });
  } catch (e) {
    await interaction.reply({
      components: [buildErrorContainer('Kullanıcı bulunamadı veya yetki verilemedi.')],
      flags: MessageFlags.IsComponentsV2,
      ephemeral: true,
    });
  }
}

async function handleRemoveUserSubmit(interaction) {
  const userId = interaction.fields.getTextInputValue('remove_user_id').trim();

  try {
    await interaction.channel.permissionOverwrites.delete(userId);

    await interaction.reply({
      components: [buildUserRemovedContainer(interaction.user.id, userId)],
      flags: MessageFlags.IsComponentsV2,
    });
  } catch (e) {
    await interaction.reply({
      components: [buildErrorContainer('Kullanıcı bulunamadı veya yetki alınamadı.')],
      flags: MessageFlags.IsComponentsV2,
      ephemeral: true,
    });
  }
}

async function handleRenameSubmit(interaction) {
  const newName = interaction.fields.getTextInputValue('new_name').trim();

  try {
    await interaction.channel.setName(newName);

    await interaction.reply({
      components: [buildTicketRenamedContainer(newName)],
      flags: MessageFlags.IsComponentsV2,
    });
  } catch (e) {
    await interaction.reply({
      components: [buildErrorContainer('Kanal adi değiştirilemedi.')],
      flags: MessageFlags.IsComponentsV2,
      ephemeral: true,
    });
  }
}

async function handleNoteSubmit(interaction) {
  const note = interaction.fields.getTextInputValue('note_content').trim();

  await interaction.reply({
    components: [buildTicketNoteContainer(interaction.user.id, note)],
    flags: MessageFlags.IsComponentsV2,
  });
}

// ═══════════════════════════════════════
// TICKET KAPATMA + PUANLAMA
// ═══════════════════════════════════════

async function handleCloseTicket(interaction) {
  const hasRole = interaction.member.roles.cache.has(config.yetkiliRolId);
  const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);
  if (!hasRole && !isAdmin) {
    return interaction.reply({
      components: [buildErrorContainer('Bu işlemi sadece yetkililer yapabilir.')],
      flags: MessageFlags.IsComponentsV2,
      ephemeral: true,
    });
  }

  const data = ticketData.get(interaction.channelId);

  await interaction.reply({
    components: [buildRatingContainer()],
    flags: MessageFlags.IsComponentsV2,
  });
}

async function handleRating(interaction) {
  const rating = parseInt(interaction.customId.replace('rate_', ''));
  const data = ticketData.get(interaction.channelId);

  const channelName = interaction.channel.name;
  const guildName = interaction.guild.name;
  const userId = data ? data.userId : interaction.user.id;

  await interaction.reply({
    components: [buildRatingThankYouContainer(rating)],
    flags: MessageFlags.IsComponentsV2,
  });

  try {
    const user = await interaction.client.users.fetch(userId);
    await user.send({
      components: [buildRatingDMContainer(rating, channelName, guildName)],
      flags: MessageFlags.IsComponentsV2,
    });
  } catch (e) {
    console.log('[DM] DM gönderilemedi:', e.message);
  }

  const logChannel = interaction.guild.channels.cache.get(config.logKanalId);
  if (logChannel) {
    await logChannel.send({
      components: [buildRatingLogContainer({
        userId,
        rating,
        channelName,
        guildName,
        note: null,
      })],
      flags: MessageFlags.IsComponentsV2,
    });
  }

  ticketData.delete(interaction.channelId);

  setTimeout(async () => {
    try {
      await interaction.channel.delete('Ticket kapatıldı - puanlama alindi');
    } catch (e) {
      console.log('[CHANNEL DELETE] Kanal silinemedi:', e.message);
    }
  }, 3000);
}

// ═══════════════════════════════════════
// UTILITY
// ═══════════════════════════════════════

async function safeReply(interaction, container) {
  const payload = {
    components: [container],
    flags: MessageFlags.IsComponentsV2,
    ephemeral: true,
  };
  if (interaction.replied || interaction.deferred) {
    await interaction.followUp(payload);
  } else {
    await interaction.reply(payload);
  }
}
