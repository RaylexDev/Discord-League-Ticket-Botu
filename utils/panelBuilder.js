const {
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
  SectionBuilder,
  ThumbnailBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');

// ═══════════════════════════════════════
// TEMA & SABITLER
// ═══════════════════════════════════════

const THEME = {
  accentColor: 0x0099ff,
  successColor: 0x57f287,
  warningColor: 0xfee75c,
  dangerColor: 0xed4245,
  thumbnailUrl: 'https://cdn.discordapp.com/attachments/1546939876237385838/1547140895369859082/850967-griffon-star.gif?ex=6aa4f9bd&is=6aa3a83d&hm=29103ac945d14c4fc0d4a3f8836310a6073b3216e7e75c87740a76c25836668f&',
  bannerUrl: null,
};

const EMOJIS = {
  logo: '<:yeniemoji:1555262854985289793>',
  wumpus: '<:wumpus:1479706551504732211>',
  heart: '<:kalp:1479706407547703387>',
  info: '<:info:1479705601377570960>',
  animated: '<a:sebep:1479507763427020820>',
  create: '<:olustur:1479836751294894141>',
  accept: '<:accept:1479706407547703387>',
  close: '<:kapat:1479507777503363085>',
  add: '<:ekle:1485354637618974770>',
  remove: '<:cikar:1479507763427020820>',
  rename: '<:isim:1479705601377570960>',
  note: '<:not:1497240649265713255>',
  star1: '<:1star:1479706407547703387>',
  star5: '<:5star:1479706407547703387>',
};

const CATEGORIES = [
  {
    label: 'Teknik Destek',
    value: 'teknik_destek',
    emoji: '<:staff:1513901138800541736>',
    description: 'Kurulum, hata ve teknik sorunlar',
    color: THEME.warningColor,
  },
  {
    label: 'Değer',
    value: 'deger',
    emoji: '<:destek:1497240649265713255>',
    description: 'Futbolculara verilen değer değerlendirme',
    color: THEME.accentColor,
  },
  {
    label: 'Bütçe',
    value: 'butce',
    emoji: '<:shop:1497240811425759272>',
    description: 'Teknik direktörlere verilen bütçe planlaması',
    color: THEME.successColor,
  },
  {
    label: 'Satın Alma',
    value: 'satin_alma',
    emoji: '<:olustur:1479836751294894141>',
    description: 'Oyuncu ve hizmet satın alımları',
    color: THEME.dangerColor,
  },
  {
    label: 'Ödül Talep',
    value: 'odul_talep',
    emoji: '<:accept:1479706407547703387>',
    description: 'Etkinlik çekiliş ödülünü alma talebi',
    color: 0xf1c40f,
  },
];

// ═══════════════════════════════════════
// ANA PANEL
// ═══════════════════════════════════════

function buildPanelContainer(guild) {
  const serverIcon = guild?.iconURL({ extension: 'png', size: 256 }) || THEME.thumbnailUrl;
  const container = new ContainerBuilder();

  if (THEME.bannerUrl) {
    container.addMediaGalleryComponents(
      new MediaGalleryBuilder().addItems(new MediaGalleryItemBuilder().setURL(THEME.bannerUrl))
    );
  }

  container.addSectionComponents(
    new SectionBuilder()
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          `# ${EMOJIS.logo} Golazo Destek Merkezi\n${EMOJIS.wumpus} Merhaba! Size nasıl yardımcı olabiliriz?\nAşağıdaki butonu kullanarak destek talebi oluşturabilirsiniz.`
        )
      )
      .setThumbnailAccessory(new ThumbnailBuilder().setURL(serverIcon))
  );

  container.addSeparatorComponents(
    new SeparatorBuilder().setDivider(true).setSpacing(1)
  );

  container.addTextDisplayComponents(
    new TextDisplayBuilder().setContent(
      [
        `### ${EMOJIS.animated} Kategorilerimiz`,
        '',
        `> ${CATEGORIES[0].emoji} **Teknik Destek** — Kurulum, hata ve teknik sorunlar`,
        `> ${CATEGORIES[1].emoji} **Değer** — Futbolculara verilen değer değerlendirme`,
        `> ${CATEGORIES[2].emoji} **Bütçe** — Teknik direktörlere verilen bütçe planlaması`,
        `> ${CATEGORIES[3].emoji} **Satın Alma** — Oyuncu ve hizmet satın alımları`,
        `> ${CATEGORIES[4].emoji} **Ödül Talep** — Etkinlik çekiliş ödülünü alma talebi`,
      ].join('\n')
    )
  );

  container.addSeparatorComponents(
    new SeparatorBuilder().setDivider(true).setSpacing(2)
  );

  container.addTextDisplayComponents(
    new TextDisplayBuilder().setContent(
      `${EMOJIS.heart} Yetkililerimiz en kısa sürede yanıt verecektir.\n${EMOJIS.info} Tüm destek talepleri gizlidir.`
    )
  );

  container.addSeparatorComponents(
    new SeparatorBuilder().setDivider(true).setSpacing(1)
  );

  container.addActionRowComponents(
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('open_ticket')
        .setLabel('Ticket Oluştur')
        .setEmoji(EMOJIS.create)
        .setStyle(ButtonStyle.Primary)
    )
  );

  container.addSeparatorComponents(
    new SeparatorBuilder().setDivider(true).setSpacing(1)
  );

  container.addMediaGalleryComponents(
    new MediaGalleryBuilder().addItems(
      new MediaGalleryItemBuilder().setURL('https://cdn.discordapp.com/attachments/1556010215525056532/1556028674975727688/ticket.jpg?backend=b2&ex=6ac2ac21&is=6ac15aa1&hm=db0d4957c9ba46d15a27ea45bc0ee857f199694a914199d7fb69efc901ef6aec&')
    )
  );

  return container;
}

function buildPanelComponents() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('open_ticket')
      .setLabel('Ticket Oluştur')
      .setEmoji(EMOJIS.create)
      .setStyle(ButtonStyle.Primary)
  );
}

// ═══════════════════════════════════════
// KATEGORI SECIM
// ═══════════════════════════════════════

function buildCategorySelectContainer() {
  const categoryLines = CATEGORIES.map(
    (c) => `${c.emoji} **${c.label}** — ${c.description}`
  ).join('\n');

  return new ContainerBuilder()
    .setAccentColor(THEME.accentColor)

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`## ${EMOJIS.animated} Kategori Seçimi`)
    )

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        'Talebinize en uygun kategoriyi aşağıdaki menüden seçiniz.\nDoğru kategori, daha hızlı yanıt almanızı sağlar.'
      )
    )

    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(2)
    )

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(categoryLines)
    )

    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(false).setSpacing(1)
    )

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        `${EMOJIS.info} Kategorinizi değiştirmek isterseniz yeni bir ticket oluşturabilirsiniz.`
      )
    );
}

function buildCategorySelectRow() {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('ticket_category')
      .setPlaceholder('Bir kategori seçiniz...')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions(
        CATEGORIES.map((c) => ({
          label: c.label,
          value: c.value,
          description: c.description,
          emoji: c.emoji,
        }))
      )
  );
}

// ═══════════════════════════════════════
// TICKET ICERIK KONTAINERLARI
// ═══════════════════════════════════════

function buildTicketWelcomeContainer(categoryValue) {
  const cat = CATEGORIES.find((c) => c.value === categoryValue);
  if (!cat) return buildErrorContainer('Geçersiz kategori.');

  const instructions = {
    teknik_destek: [
      '• Sorununuzu net bir şekilde ifade ediniz',
      '• Ekran görüntüsü mevcutsa paylaşınız',
      '• Hata mesajı aldıysanız iletiniz',
    ],
    deger: [
      '• Değerlendirilecek futbolcuyu belirtiniz',
      '• Performans kriterlerinizi açıklayınız',
      '• Değerlendirme notlarınızı paylaşınız',
    ],
    butce: [
      '• Teknik direktör bütçe planınızı belirtiniz',
      '• Transfer bütçenizi iletiniz',
      '• Maaş ve ödeme tercihlerinizi belirtiniz',
    ],
    satin_alma: [
      '• Satın almak istediğiniz oyuncuyu belirtiniz',
      '• Bütçenizi ve süre tercihinizi iletiniz',
      '• Özel bir talebiniz varsa açıklayınız',
    ],
    odul_talep: [
      '• Hangi etkinlikten ödül kazandığınızı belirtiniz',
      '• Çekiliş veya etkinlik tarihini iletiniz',
      '• Kazandığınız ödülün detaylarını yazınız',
    ],
  };

  const lines = instructions[categoryValue] || [];

  return new ContainerBuilder()
    .setAccentColor(cat.color)

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`## ${cat.emoji} ${cat.label} Talebi`)
    )

    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(2)
    )

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        `Talebiniz alınmıştır. Lütfen aşağıdaki bilgileri sağlayınız:\n\n${lines.join('\n')}\n\n${EMOJIS.heart} Yetkililerimiz en kısa sürede dönecektir.`
      )
    );
}

const buildTeknikDestekContainer = () => buildTicketWelcomeContainer('teknik_destek');
const buildDegerContainer = () => buildTicketWelcomeContainer('deger');
const buildButceContainer = () => buildTicketWelcomeContainer('butce');
const buildSatinAlmaContainer = () => buildTicketWelcomeContainer('satin_alma');
const buildOdulTalepContainer = () => buildTicketWelcomeContainer('odul_talep');

// ═══════════════════════════════════════
// TICKET YONETIM BUTONLARI
// ═══════════════════════════════════════

function buildTicketManageButtons() {
  return [
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket_accept')
        .setLabel('Üstlen')
        .setEmoji(EMOJIS.accept)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('ticket_close')
        .setLabel('Kapat')
        .setEmoji(EMOJIS.close)
        .setStyle(ButtonStyle.Danger)
    ),
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket_add')
        .setLabel('Ekle')
        .setEmoji(EMOJIS.add)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('ticket_remove')
        .setLabel('Çıkar')
        .setEmoji(EMOJIS.remove)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('ticket_rename')
        .setLabel('İsim Değiştir')
        .setEmoji(EMOJIS.rename)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('ticket_note')
        .setLabel('Not Ekle')
        .setEmoji(EMOJIS.note)
        .setStyle(ButtonStyle.Primary)
    ),
  ];
}

// ═══════════════════════════════════════
// TICKET DURUM KONTAINERLARI
// ═══════════════════════════════════════

function buildTicketHeader(memberId, roleId, categoryLabel) {
  return new ContainerBuilder()
    .setAccentColor(THEME.accentColor)
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        `<@${memberId}> | <@&${roleId}> — **${categoryLabel}** talebi açılmıştır.`
      )
    );
}

function buildTicketAcceptedContainer(staffId) {
  return new ContainerBuilder()
    .setAccentColor(THEME.successColor)
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        `${EMOJIS.accept} <@${staffId}> tarafından bu talep üstlenildi.`
      )
    );
}

function buildTicketRenamedContainer(newName) {
  return new ContainerBuilder()
    .setAccentColor(THEME.accentColor)
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        `${EMOJIS.rename} Ticket başarıyla **${newName}** olarak yeniden adlandırıldı.`
      )
    );
}

function buildTicketNoteContainer(staffId, note) {
  return new ContainerBuilder()
    .setAccentColor(THEME.warningColor)

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`## ${EMOJIS.note} Yeni Not`)
    )

    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(1)
    )

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`**Ekleyen:** <@${staffId}>\n**Not:** ${note}`)
    );
}

function buildUserAddedContainer(staffId, userId) {
  return new ContainerBuilder()
    .setAccentColor(THEME.accentColor)
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        `${EMOJIS.add} <@${staffId}> tarafından <@${userId}> tikete eklendi.`
      )
    );
}

function buildUserRemovedContainer(staffId, userId) {
  return new ContainerBuilder()
    .setAccentColor(THEME.dangerColor)
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        `${EMOJIS.remove} <@${staffId}> tarafından <@${userId}> tiketten çıkarıldı.`
      )
    );
}

// ═══════════════════════════════════════
// PUANLAMA SISTEMI
// ═══════════════════════════════════════

function buildRatingContainer() {
  return new ContainerBuilder()
    .setAccentColor(THEME.accentColor)

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent('## <:basvuru:1479507783111147697> Destek Değerlendirmesi')
    )

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        'Destek deneyiminizi değerlendirmek için aşağıdaki butonlardan birine tıklayınız.\nGeri bildiriminiz hizmet kalitemizi artırmamız için çok önemlidir.'
      )
    )

    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(2)
    )

    .addActionRowComponents(
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('rate_1').setLabel('1').setEmoji(EMOJIS.star1).setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId('rate_2').setLabel('2').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId('rate_3').setLabel('3').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('rate_4').setLabel('4').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('rate_5').setLabel('5').setEmoji(EMOJIS.star5).setStyle(ButtonStyle.Success)
      )
    );
}

function buildRatingDMContainer(rating, channelName, guildName) {
  const stars = '<:basvuru:1479507783111147697>'.repeat(rating);
  return new ContainerBuilder()
    .setAccentColor(THEME.accentColor)

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent('## <:basvuru:1479507783111147697> Değerlendirmeniz Alındı')
    )

    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(2)
    )

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        `**Puan:** ${stars} (\`${rating}/5\`)\n**Sunucu:** \`${guildName}\`\n**Ticket:** \`${channelName}\`\n\n${EMOJIS.heart} Geri bildiriminiz için teşekkür ederiz.`
      )
    );
}

function buildRatingLogContainer({ userId, rating, channelName, guildName, note }) {
  const stars = '<:basvuru:1479507783111147697>'.repeat(rating);
  const color = rating >= 4 ? THEME.successColor : rating >= 3 ? THEME.warningColor : THEME.dangerColor;

  const container = new ContainerBuilder()
    .setAccentColor(color)

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent('## <:basvuru:1479507783111147697> Yeni Değerlendirme')
    )

    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(2)
    )

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        `**Kullanıcı:** <@${userId}>\n**Puan:** ${stars} (\`${rating}/5\`)\n**Sunucu:** \`${guildName}\`\n**Ticket:** \`${channelName}\``
      )
    );

  if (note) {
    container
      .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(1))
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(`**Ek Not:** ${note}`)
      );
  }

  return container;
}

function buildRatingThankYouContainer(rating) {
  const stars = '<:basvuru:1479507783111147697>'.repeat(rating);
  return new ContainerBuilder()
    .setAccentColor(THEME.successColor)

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`## ${EMOJIS.heart} Teşekkürler`)
    )

    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(2)
    )

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        `Değerlendirmeniz: ${stars}\nTicket kapatılıyor, ilginiz için teşekkür ederiz.`
      )
    );
}

// ═══════════════════════════════════════
// MODALLAR
// ═══════════════════════════════════════

function buildRenameModal() {
  return new ModalBuilder()
    .setCustomId('ticket_rename_modal')
    .setTitle('Ticket Yeniden Adlandır')
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('new_name')
          .setLabel('Yeni Ticket Adı')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('örn: destek-sorun-cozuldu')
          .setRequired(true)
          .setMaxLength(100)
      )
    );
}

function buildNoteModal() {
  return new ModalBuilder()
    .setCustomId('ticket_note_modal')
    .setTitle('Ticket Not Ekle')
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('note_content')
          .setLabel('Not İçeriği')
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('Ticket ile ilgili notunuzu yazınız...')
          .setRequired(true)
          .setMaxLength(1000)
      )
    );
}

function buildAddUserModal() {
  return new ModalBuilder()
    .setCustomId('ticket_add_modal')
    .setTitle('Kullanıcı Ekle')
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('add_user_id')
          .setLabel('Kullanıcı ID')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Eklenecek kullanıcının ID\'si...')
          .setRequired(true)
      )
    );
}

function buildRemoveUserModal() {
  return new ModalBuilder()
    .setCustomId('ticket_remove_modal')
    .setTitle('Kullanıcı Çıkar')
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('remove_user_id')
          .setLabel('Kullanıcı ID')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Çıkarılacak kullanıcının ID\'si...')
          .setRequired(true)
      )
    );
}

// ═══════════════════════════════════════
// TICKET KAPATMA ONAYI
// ═══════════════════════════════════════

function buildTicketCloseConfirm() {
  return new ContainerBuilder()
    .setAccentColor(THEME.dangerColor)

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`## ${EMOJIS.close} Ticket Kapatılıyor`)
    )

    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(2)
    )

    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(
        'Ticket kapatılmadan önce lütfen destek deneyiminizi değerlendiriniz.\nGeri bildiriminiz hizmet kalitemizi artırmamıza yardımcı olur.'
      )
    );
}

// ═══════════════════════════════════════
// GENEL KONTAINERLER
// ═══════════════════════════════════════

function buildSuccessContainer(message) {
  return new ContainerBuilder()
    .setAccentColor(THEME.successColor)
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent('## İşlem Başarılı')
    )
    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(2)
    )
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(message)
    );
}

function buildErrorContainer(message) {
  return new ContainerBuilder()
    .setAccentColor(THEME.dangerColor)
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent('## Hata')
    )
    .addSeparatorComponents(
      new SeparatorBuilder().setDivider(true).setSpacing(2)
    )
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent(message)
    );
}

// ═══════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════

module.exports = {
  buildPanelContainer,
  buildPanelComponents,
  buildCategorySelectContainer,
  buildCategorySelectRow,
  buildTicketWelcomeContainer,
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
  THEME,
  EMOJIS,
};
